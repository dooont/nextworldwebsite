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
  await api.delete('/auth/logout', { withCredentials: true });
}

/**
 * Retrieves a new access token. Requires cookie with accessToken
 * @returns {string} accessToken
 */
export async function refreshToken() {
  const response = await api.post('/auth/refresh', {}, { withCredentials: true });
  return response.accessToken;
}

/**
 * Sends a password reset email
 * @param {string} email - The email to send the reset link to
 */
export async function sendPasswordResetEmail(email) {
  await api.post('/auth/forgot-password', { email });
}

/**
 * Resets the password using a token
 * @param {string} token - The reset token
 * @param {string} newPassword - The new password
 */
export async function resetPassword(token, newPassword) {
  await api.post('/auth/reset-password', { token, newPassword });
}
