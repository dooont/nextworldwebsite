import { uploadImageToS3, getPresignedUrl } from "./s3Service.jsx";
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
  console.log(presignedUrl);
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
 * @param {Object} eventFormData - The event data
 * @param {File} eventData.imageFile - If this is sent, the sent flyer will be uploaded to S3 and the old one will be deleted
 * @param {String} eventData.id - The id of the event to edit
 * @param {String} eventData.flyerUrl - If imageFile was sent, this will be deleted from S3. Otherwise, this will be sent back to the backend
 * @returns {Promise} The API response
 */
export async function editUpcomingEventWithImage(eventFormData) {
  console.log(eventFormData);

  //If imageFile is sent, it means flyer was changed and should be uploaded, and get new s3 link, and old one delete
  const { imageFile, ...formWithoutFlyerImage } = eventFormData;

  if (!imageFile) { //flyer was not changed, send edited object
    return api.put('/upcoming-events', formWithoutFlyerImage);
  }


  /*
  //if image is a File, upload it to S3
  if (image instanceof File) {
    const { data } = await getPresignedUrl('upcoming-events/', image.name, image.type);
    const { presignedUrl } = data;
 
    await uploadImageToS3(presignedUrl, image, image.type);
    const imageUrl = presignedUrl.split('?')[0];
 
    // Update event with new S3 URL
    return api.put(`/upcoming-events/${id}`, {
      ...otherData,
      image: imageUrl
    });
  }
 
  //if image is a string (existing URL), just update without uploading
  return api.put(`/upcoming-events/${id}`, {
    ...otherData,
    image //keep existing URL
  });*/
}
/////////

export function editUpcomingEvent(id, upcomingEvent) {
  return api.put(`/upcoming-events/${id}`, upcomingEvent);
}