import { api } from "../api/axios.js";

/**
 * Logs in an admin user
 * @param {Object} credentials - The login credentials
 * @param {string} credentials.email - Admin email
 * @param {string} credentials.password - Admin password
 * @returns {string} - Access Token
 */
export async function login(credentials) {
  const response = await api.post('/auth/login', credentials, { withCredentials: true });
  return response.data.accessToken;
}

/**
 * Logs out the current admin user
 */
export async function logout() {
  await api.post('/auth/logout');
}

/**
 * Retrieves a new access token. Requires cookie with accessToken
 * @returns {string} accessToken
 */
export async function refreshToken() {
  const response = await api.post('/auth/refresh', {}, { withCredentials: true });
  return response.accessToken;
}
