import { generatePresignedUrl } from "../services/uploadsService.js";

export async function getPresignedUrl(req, res) {
  const { fileName, contentType, folder } = req.query;
  const presignedUrl = await generatePresignedUrl(fileName, contentType, folder);
  res.json({ presignedUrl: presignedUrl });
}