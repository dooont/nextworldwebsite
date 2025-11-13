import { findUserByEmail, findUserById } from "../repositories/adminUserRepository.js";
import { saveToken } from "../repositories/passwordResetTokenRepository.js";
import { saveRefreshToken, findRefreshToken, deleteRefreshToken, deleteAllUserRefreshTokens } from "../repositories/refreshTokenRepository.js";
import bcrypt from 'bcrypt';
import * as jose from 'jose'
import crypto from 'crypto';
import dotenv from 'dotenv/config';
import { AppError } from "../errors/AppError.js";
import AuthError from "../errors/AuthError.js";
import { sendPasswordResetRequestEmail } from "./emailService.js";


async function generateAccessToken(user){
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const expiryMins = `${process.env.ACCESS_EXPIRY_MINUTES} min${process.env.ACCESS_EXPIRY_MINUTES === '1' ? '' : 's'}`;

  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg: 'HS256'})
    .setSubject(user.admin_id.toString())
    .setExpirationTime(expiryMins)
    .sign(secret);
  
  return token;
}

async function generateRefreshToken(){
  return crypto.randomBytes(64).toString('hex');
}


//returns access and refresh tokens if authenticated
export async function authenticateUser(email, unhashedPassword){
  const storedUser = await findUserByEmail(email);
  if(!storedUser){
    throw new AuthError('Credentials invalid', 401);
  }

  if(!(await bcrypt.compare(unhashedPassword, storedUser.password))){
    throw new AuthError('Credentials invalid', 401);
  }

  const accessToken = await generateAccessToken(storedUser);
  const refreshToken = await generateRefreshToken();

  const refreshExpiryDays = parseInt(process.env.REFRESH_EXPIRY_DAYS, 10);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshExpiryDays);
  
  await saveRefreshToken(storedUser.admin_id, refreshToken, expiresAt);
  
  return {
    accessToken,
    refreshToken,
    expiresAt
  };
}

export async function refreshAccessToken(refreshToken){
  const storedToken = await findRefreshToken(refreshToken);
  
  if(!storedToken){
    throw new AuthError('Could not find valid refresh token', 401);
  }
  
  const user = await findUserById(storedToken.admin_user_id);
  if(!user){
    throw new AuthError('User not found', 404);
  }
  
  const accessToken = await generateAccessToken(user);
  
  //rotate token whenever new one is generated
  const newRefreshToken = await generateRefreshToken();
  const refreshExpiryDays = parseInt(process.env.REFRESH_EXPIRY_DAYS, 10);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshExpiryDays);
  
  //delete old, save new
  await deleteRefreshToken(refreshToken);
  await saveRefreshToken(user.admin_id, newRefreshToken, expiresAt);

  
  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresAt
  };
}

export async function revokeRefreshToken(refreshToken){
  await deleteRefreshToken(refreshToken);
}

export async function revokeAllUserTokens(adminUserId){
  await deleteAllUserRefreshTokens(adminUserId);
}

export async function createResetPasswordRequest(email){
  const user = await findUserByEmail(email);
  if(!user){
    console.error("Password Request for email: ", email, "not found.");
    return; //don't let user know if user exists or not
  }

  //generate reset token
  const user_id = user.admin_id;
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600_000); //expires an hour
  await saveToken(user_id, token, expiresAt);

  const url = process.env.FRONTEND_PASSWORD_RESET_URL;
  const s = process.env.NODE_ENV === 'development' ? '' : 's';
  const resetUrl = `http${s}://${url}?token=${token}`;

  await sendPasswordResetRequestEmail(email);
}