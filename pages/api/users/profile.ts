import prisma from '@/service/prisma';
import { s3 } from '@/service/s3';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

const profileApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = await checkPrivateApi(req, res);

  if (req.method === 'GET') {
    const userProfile = await prisma.user.findUnique({
      where: {
        email: email ?? '',
      },
      select: {
        email: true,
        image: true,
        profile: {
          select: {
            document: true,
            phoneNumber: true,
            image: true,
          },
        },
      },
    });

    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: userProfile?.profile?.image,
    });

    if (userProfile?.profile?.image) {
      userProfile.profile.image = url;
    }

    return res.status(200).json({ userProfile });
  }

  if (req.method === 'POST') {
    const { document, phone, image } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      await prisma.profile.upsert({
        where: {
          userId: user?.id,
        },
        update: {
          document: {
            set: document,
          },
          phoneNumber: {
            set: phone,
          },
          image: {
            set: `${email}/${image}`,
          },
        },
        create: {
          document,
          phoneNumber: phone,
          image: `${email}/${image}`,
          userId: user?.id ?? '',
        },
      });
    }

    return res.status(200).json({ message: 'Hello from profile API' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default profileApi;
