import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function saveRefreshToken(adminUserId, token, expiresAt){
  try{
    await dbPool.query(
      'INSERT INTO refresh_tokens(admin_user_id, token, expires_at) VALUES($1, $2, $3)',
      [adminUserId, token, expiresAt]
    );
  }catch(err){
    throw new DatabaseError('Could not save refresh token', 500, err);
  }
}

export async function findRefreshToken(token){
  try{
    const result = await dbPool.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    return result.rows[0];
  }catch(err){
    throw new DatabaseError('Error finding refresh token', 500, err);
  }
}

export async function deleteRefreshToken(token){
  try{
    await dbPool.query(
      'DELETE FROM refresh_tokens WHERE token = $1',
      [token]
    );
  }catch(err){
    throw new DatabaseError('Could not delete refresh token', 500, err);
  }
}

export async function deleteAllUserRefreshTokens(adminUserId){
  try{
    await dbPool.query(
      'DELETE FROM refresh_tokens WHERE admin_user_id = $1',
      [adminUserId]
    );
  }catch(err){
    throw new DatabaseError('Could not delete user refresh tokens', 500, err);
  }
}

