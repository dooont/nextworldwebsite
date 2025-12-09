import { api } from "../api/axios.js";

/**
 * Sends inquiry email thru api
 * @param {Object} inquiry - The inquiry data.
 * @param {string} inquiry.firstName
 * @param {string} inquiry.lastName 
 * @param {string} inquiry.userEmail
 * @param {string} inquiry.inquiryBody
 * @returns {Promise} The API response.
 */
export function createInquiry(inquiry) {
  return api.post('/inquiries', inquiry);
}
