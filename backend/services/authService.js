import { findUserByEmail } from "../repositories/adminUserRepository.js";
import bcrypt from 'bcrypt';
import * as jose from 'jose'
import dotenv from 'dotenv/config';
import { AppError } from "../errors/AppError.js";


async function generateToken(user){
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg: 'HS256'})
    .setSubject(user.id)
    .setExpirationTime('10 mins')
    .sign(secret);
  //reference: constructor methods set the optional payload properties
  return token;
}

//returns token if authenticated
export async function authenticateUser(email, unhashedPassword){
  const storedUser = await findUserByEmail(email);
  if(!storedUser){
    throw new AppError('Credentials invalid', 401);
  }

  if(!(await bcrypt.compare(unhashedPassword, storedUser.password))){
    throw new AppError('Credentials invalid', 401);
  }

  const token = await generateToken(storedUser);
  return token;
}