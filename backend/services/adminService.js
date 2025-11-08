import { findUserByEmail } from "../repositories/adminRepository.js";
import bcrypt from 'bcrypt';

//returns true or false
export async function authenticateUser(email, unhashedPassword){
  const user = await findUserByEmail(email);
  console.log(user.password);
  if(user){
    const isMatch = await bcrypt.compare(unhashedPassword, user.password);
    if(isMatch){
      return true;
    }
  }
  
  return false
}