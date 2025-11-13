export default class PasswordResetToken{
  constructor(adminUserId, token, expiresAt){
    this.adminUserId = adminUserId, //db is admin_user_id
    this.token = token;
    this.expiresAt = expiresAt; //db is expires_at (unix timestamp)
  }
}