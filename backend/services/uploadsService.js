import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv/config";
import crypto from "crypto";
import { AppError } from "../errors/AppError.js";

const awsRegion = process.env.AWS_S3_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const imageBucketName = process.env.AWS_IMAGE_BUCKET;

const s3 = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

//returns ".extension"
function getFileExtension(fileName) {
  let splitName = fileName.split(".");
  if (splitName.length > 1) {
    return '.' + splitName.pop();
  }
  return '';
}

function generateRandomFileName(fileName) {
  const randomString = crypto.randomBytes(16).toString('hex');
  const extension = getFileExtension(fileName);
  return `${randomString}${extension}`;
}

export async function generatePresignedUrl(fileName, contentType, folder) {
  const randomFileName = generateRandomFileName(fileName);

  const command = new PutObjectCommand({
    Bucket: imageBucketName,
    Key: `${folder}${randomFileName}`,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return presignedUrl;
}

export async function deleteFileFromS3(folder, key){
  folder.endsWith('/') ? folder : folder + '/'; //make sure folder ends with slash
  
  await s3.send(
    new DeleteObjectCommand({
      Bucket: imageBucketName,
      Key: `${folder}${key}`
    })
  );
}