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