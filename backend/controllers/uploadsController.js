import { S3Error } from "../errors/s3Errors.js";
import { generatePresignedUrl } from "../services/uploadsService.js";

export async function getPresignedUrl(req, res) {
  const { fileName, contentType } = req.query;

  try {
    const presignedUrl = await generatePresignedUrl(fileName, contentType);
    res.json({ presignedUrl: presignedUrl });
  } catch (e) {
    throw new S3Error("Error generating Presigned URL: ", 500, e.message);
  }
}