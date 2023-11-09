import { s3 } from '@/service/s3';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

const fileUploadApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = await checkPrivateApi(req, res);

  if (req.method === 'POST') {
    const { fileName, fileType } = req.body;

    const postData = s3.createPresignedPost({
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
      Fields: {
        key: `${email}/${fileName}`,
        'Content-Type': fileType,
      },
      Expires: 60, // seconds
    });

    return res.status(200).json({ ...postData });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default fileUploadApi;
