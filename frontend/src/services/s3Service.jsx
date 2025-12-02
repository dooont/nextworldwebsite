import { api } from "../api/axios.js";
import axios from "axios";

/**
 * 
 * @param {String} params.folder -Folder to store file ex) 'upcoming-events/' 
 * @param {String} fileName 
 * @param {String} contentType 
 * @returns {Promise} - Resolves into presigned URL
 */
export async function getPresignedUrl(folder, fileName, contentType) {
  folder = folder.endsWith('/') ? folder : folder + '/'; //make sure folder ends with slash
  return await api.get(`/uploads/presign?folder=${folder}&fileName=${fileName}&contentType=${contentType}`);
}

/**
 * Uploads image to S3 using presigned URL
 * @param {String} presignedUrl - Presigned URL 
 * @param {File} file - Image file to upload
 * @param {String} contentType - Content type of file. MUST match content-type of generated presigned URL 
 * @returns {Object} - Axios response object
 */
export async function uploadImageToS3(presignedUrl, file, contentType) {
  return await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': contentType
    }
  });
}

/**
 * Deletes image from s3 using backend
 * @param {String} imageUrl
 */
export async function deleteImageFromS3(imageUrl) {
  return await api.delete(`/uploads?fileUrl=${imageUrl}`);
}