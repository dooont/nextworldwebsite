import { AppError } from "../errors/AppError.js";
import { generatePresignedUrl } from "../services/uploadsService.js";

export async function getPresignedUrl(req, res) {
  const { fileName, contentType } = req.query;
  const presignedUrl = await generatePresignedUrl(fileName, contentType);
  res.json({ presignedUrl: presignedUrl });
}