import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function findValidResetToken(token){
  try{
    const result = await dbPool.query(
      'SELECT * FROM reset_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    return result.rows[0];
  }catch(err){
    throw new DatabaseError('Could not find reset token', 500, err);
  }
}

export async function deleteResetToken(token){
  try{
    await dbPool.query(
      'DELETE FROM reset_tokens WHERE token = $1',
      [token]
    );
  }catch(err){
    throw new DatabaseError('Could not delete reset token', 500, err);
  }
}

