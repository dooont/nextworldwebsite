import { uploadImageToS3, getPresignedUrl } from "./s3Service.jsx";
import { deleteImageFromS3 } from "./s3Service.jsx";
import { api } from "../api/axios.js";

export async function getUpcomingEvents() {
  const response = await api.get('/upcoming-events');
  return response.data;
}

export function createUpcomingEvent(upcomingEvent) {
  return api.post('/upcoming-events', upcomingEvent);
}

/**
 * Creates an upcoming event with image upload to S3. Below are required fields, all other fields match the ones from backend
 * @param {Object} eventData - The event data including the image file. From the form
 * @param {File} eventData.imageFile - The image file to upload. Should be the File Input from form
 * - eventData.imageFile is stripped and replaced with eventData.flyerUrl
 * @returns {Promise} The API response
 */
export async function createUpcomingEventWithImage(eventData) {
  if (!eventData.imageFile || !(eventData.imageFile instanceof File)) {
    throw new Error('No image file provided');
  }

  const { data: { presignedUrl } } = await getPresignedUrl('upcoming-events/', eventData.imageFile.name, eventData.imageFile.type);
  await uploadImageToS3(presignedUrl, eventData.imageFile, eventData.imageFile.type);

  const flyerUrl = presignedUrl.split('?')[0];

  const { imageFile, ...formWithoutImageFile } = eventData; //remove the image file and replace with flyerUrl
  const upcomingEvent = { ...formWithoutImageFile, flyerUrl }

  return await api.post('/upcoming-events', upcomingEvent);
}

export function deleteUpcomingEventById(id) {
  return api.delete(`/upcoming-events/${id}`);
}

//////
/**
 * Edits an upcoming event with optional new image upload to S3. Below are required fields, all other fields match the ones from backend
 * @param {Number|String} id - The id of the event to edit
 * @param {Object} data - The event data
 * @param {File} data.imageFile - If this is sent, the sent flyer will be uploaded to S3 and the old one will be deleted
 * @param {String} data.flyerUrl - If imageFile was sent, this flyer will be deleted from S3. Otherwise, this will be sent back to the backend
 * @returns {Promise} The API response
 */
export async function editUpcomingEventWithImage(id, eventFormData) {

  //If imageFile is sent, it means flyer was changed and should be uploaded, and get new s3 link, and old one delete
  const { imageFile, ...formWithoutFlyerImage } = eventFormData;

  if (!imageFile) { //flyer was not changed, send edited object
    return await editUpcomingEvent(id, formWithoutFlyerImage);
  }

  //if flyer was changed
  //TO DO: 
  // 1. delete old flyer ✅
  // 2. upload new flyer ✅    
  // 3. upload edited upcoming event with new flyer
  await deleteImageFromS3(formWithoutFlyerImage.flyerUrl);

  const { data: { presignedUrl } } = await getPresignedUrl('upcoming-events/', imageFile.name, imageFile.type);
  await uploadImageToS3(presignedUrl, imageFile, imageFile.type);
  const flyerUrl = presignedUrl.split('?')[0];

  const editedUpcomingEvent = {
    ...formWithoutFlyerImage,
    flyerUrl
  }

  return api.put(`/upcoming-events/${id}`, editedUpcomingEvent);
}

export function editUpcomingEvent(id, upcomingEvent) {
  return api.put(`/upcoming-events/${id}`, upcomingEvent);
}