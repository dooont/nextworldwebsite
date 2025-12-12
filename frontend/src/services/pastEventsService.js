import { api } from '../api/axios.js';
import { deleteImageFromS3, getPresignedUrl, uploadImageToS3 } from './s3Service.js';

/**
 * Fetches all past events from the backend
 * @returns {Promise} The API response with past events array
 */
export async function getPastEvents() {
  const response = await api.get('/past-events');
  return response.data;
}

/**
 * Creates a past event with image upload to S3. Below are required fields, all other fields match the ones from backend
 * @param {Object} eventData - The event data including the image file. From the form
 * @param {File} eventData.imageFile - The image file to upload. Should be the File Input from form
 * @param {String} eventData.title - Event title
 * @param {String} eventData.date - Event date
 * @param {String} eventData.description - Event description
 * @param {String} eventData.place - Event location
 * @param {Array} eventData.artists - Array of artist objects {name, contact}
 * - eventData.imageFile is stripped and replaced with eventData.flyerUrl
 * @returns {Promise} The API response
 */
export async function createPastEventWithImage(eventData) {
  if (!eventData.imageFile || !(eventData.imageFile instanceof File)) {
    throw new Error('No image file provided');
  }

  const { data: { presignedUrl } } = await getPresignedUrl('past-events/', eventData.imageFile.name, eventData.imageFile.type);
  await uploadImageToS3(presignedUrl, eventData.imageFile, eventData.imageFile.type);

  const flyerUrl = presignedUrl.split('?')[0];

  const { imageFile, ...formWithoutImageFile } = eventData; //remove the image file and replace with flyerUrl
  const pastEvent = { ...formWithoutImageFile, flyerUrl }

  return await api.post('/past-events', pastEvent);
}

/**
 * Deletes a past event by ID
 * @param {Number|String} id - The id of the past event to delete
 * @returns {Promise} The API response
 */
export function deletePastEventById(id) {
  return api.delete(`/past-events/${id}`);
}

/**
 * Edits a past event with optional new image upload to S3. Below are required fields, all other fields match the ones from backend
 * @param {Number|String} id - The id of the event to edit
 * @param {Object} data - The event data
 * @param {File} data.imageFile - If this is sent, the sent flyer will be uploaded to S3 and the old one will be deleted
 * @param {String} data.flyerUrl - If imageFile was sent, this flyer will be deleted from S3. Otherwise, this will be sent back to the backend
 * @returns {Promise} The API response
 */
export async function editPastEventWithImage(id, eventFormData) {
  //If imageFile is sent, it means flyer was changed and should be uploaded, and get new s3 link, and old one delete
  const { imageFile, ...formWithoutFlyerImage } = eventFormData;

  if (!imageFile) { //flyer was not changed, send edited object
    return await editPastEvent(id, formWithoutFlyerImage);
  }

  //if flyer was changed
  // 1. delete old flyer
  // 2. upload new flyer    
  // 3. upload edited past event with new flyer
  await deleteImageFromS3(formWithoutFlyerImage.flyerUrl);

  const { data: { presignedUrl } } = await getPresignedUrl('past-events/', imageFile.name, imageFile.type);
  await uploadImageToS3(presignedUrl, imageFile, imageFile.type);
  const flyerUrl = presignedUrl.split('?')[0];

  const editedPastEvent = {
    ...formWithoutFlyerImage,
    flyerUrl
  }

  return api.put(`/past-events/${id}`, editedPastEvent);
}

/**
 * Edits a past event without changing the flyer
 * @param {Number|String} id - The id of the event to edit
 * @param {Object} pastEvent - The event data
 * @returns {Promise} The API response
 */
export function editPastEvent(id, pastEvent) {
  return api.put(`/past-events/${id}`, pastEvent);
}