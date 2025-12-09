import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function saveToken(adminUserId='', token='', expiresAt=''){
  try{
    await dbPool.query(`INSERT INTO reset_tokens VALUES($1, $2, $3)`,
      [adminUserId, token, expiresAt]
    );
  }catch(err){
    throw new DatabaseError('Could not create reset token', 500, err);
  }
}

