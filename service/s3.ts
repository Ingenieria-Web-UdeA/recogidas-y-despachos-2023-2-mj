import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION || '',
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }),
});

const s3 = new AWS.S3();

export { s3 };
