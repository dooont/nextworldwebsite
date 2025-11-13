import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";


export async function findUserByEmail(email){
  try{
    const result = await dbPool.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email]
    );
    return result.rows[0]; //returns undefined if user not found
  }catch(err){
    throw new DatabaseError('Could not complete request');
  }
}

export async function findUserById(adminUserId){
  try{
    const result = await dbPool.query(
      'SELECT * FROM admin_users WHERE admin_id = $1',
      [adminUserId]
    );
    return result.rows[0];
  }catch(err){
    throw new DatabaseError('Could not complete request');
  }
}

export async function updateUserPassword(adminUserId, hashedPassword){
  try{
    await dbPool.query(
      'UPDATE admin_users SET password = $1 WHERE admin_id = $2',
      [hashedPassword, adminUserId]
    );
  }catch(err){
    throw new DatabaseError('Could not update password');
  }
}