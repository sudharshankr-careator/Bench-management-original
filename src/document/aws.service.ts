import * as AWS from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
async function uploadFileInAWS(
  file: Express.Multer.File,
  usrId: any,
  category: string,
) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();
  var awsKey: string;
  if (category === 'document') {
    awsKey = `document/${usrId}/aws-doc-${uuid()}-${file.originalname}`;
  } else if (category === 'profile') {
    awsKey = `profile-image/aws-pic-${uuid()}-${file.originalname}`;
  }
  const uploadResult = await s3
    .upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: file.buffer,
      Key: awsKey,
    })
    .promise();
  const awsFileInfo = {
    awsFilePath: uploadResult.Location,
    awsFileName: path.basename(uploadResult.Key),
  };
  return awsFileInfo;
}

export default uploadFileInAWS;
