import { generatePresignedUrl } from "../services/uploadsService.js";
import { deleteImageFromS3 } from "../services/uploadsService.js";

export async function getPresignedUrl(req, res) {
  const { fileName, contentType, folder } = req.query;
  const presignedUrl = await generatePresignedUrl(fileName, contentType, folder);
  res.json({ presignedUrl: presignedUrl });
}

export async function deleteS3Image(req, res) {
  const { fileUrl } = req.query;
  console.log("Original: ", fileUrl);

  const url = new URL(fileUrl);
  console.log("Url: ", url);
  const key = url.pathname
  console.log("Key: ", key);

  await deleteImageFromS3(key);
  res.status(200).send();
}