import * as AWS from "aws-sdk";
export const s3 = new AWS.S3();

export const getPresignedUrl = async (fileName: string) => {
  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Expires: 3600,
  });

  return url;
};
