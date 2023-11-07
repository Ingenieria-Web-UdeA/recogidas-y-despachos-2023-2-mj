import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION || '',
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }),
});

const fileUploadApi = async (req: NextApiRequest, res: NextApiResponse) => {
  //   await checkPrivateApi(req, res);

  if (req.method === 'POST') {
    const { fileName, fileType, email } = req.body;

    const s3 = new AWS.S3();

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
