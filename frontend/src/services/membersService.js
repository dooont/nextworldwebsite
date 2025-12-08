import { api } from '../api/axios.js';
import { deleteImageFromS3, getPresignedUrl, uploadImageToS3 } from './s3Service.jsx';

export async function getMembersByType(type) {
  if (type !== "exec" && type !== "other") {
    throw new Error("Type must be exec or other");
  }

  const response = await api.get(`/members/${type}`);
  return response.data;
}

export async function getAllMembers() {
  const response = await api.get('/members');
  return response.data;
}

/**
 * Creates an upcoming event with image upload to S3. Below are required fields, all other fields match the ones from backend
 * @param {Object} eventData - The event data including the image file. From the form
 * @param {File} eventData.imageFile - The image file to upload. Should be the File Input from form
 * - eventData.imageFile is stripped and replaced with eventData.flyerUrl (with url from uploaded s3 image)
 * @returns {Promise} The API response
 */
export async function createMemberWithImage(formData){
  if(!formData.photoFile || !(formData.photoFile instanceof File)){
    throw new Error('No image file provided');
  }

  const { data: { presignedUrl } } = await getPresignedUrl('members/', formData.photoFile.name, formData.photoFile.type);
  await uploadImageToS3(presignedUrl, formData.photoFile, formData.photoFile.type);

  const photoUrl = presignedUrl.split('?')[0];
  
  const { imageFile, ...formWithoutImageFile } = formData; //remove image file and replace with photoUrl
  const newMember = { ...formWithoutImageFile, photoUrl };

  return await api.post('/members', newMember);
}

export async function deleteMemberById(id) {
  return await api.delete(`/members/${id}`);
}

export async function editMemberWithImage(id, updatedMemberFormData) {
  //If photoFile is sent, it means flyer was changed and should be uploaded to s3. Get new s3 link and delete old one
  const { photoFile, ...formWithoutPhotoFile } = updatedMemberFormData;

  if(!photoFile){
    return await editMember(id, formWithoutPhotoFile);
  }

  await deleteImageFromS3(formWithoutPhotoFile.photoUrl);

  const { data: { presignedUrl } } = await getPresignedUrl('members/', photoFile.name, photoFile.type);
  await uploadImageToS3(presignedUrl, photoFile, photoFile.type);
  const photoUrl = presignedUrl.split('?')[0];

  const editedMember = {
    ...formWithoutPhotoFile,
    photoUrl
  }


  return await editMember(id, editedMember);
}

export async function editMember(id, updatedMemberFormData){
  return await api.put(`/members/${id}`, updatedMemberFormData);
}