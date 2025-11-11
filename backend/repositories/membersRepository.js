import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function saveMember(firstName='', lastName='', role='', photo='', description='', funFact='', type=''){
  try{
    const result = await dbPool.query(
      'INSERT INTO members(first_name, last_name, role, photo, description, fun_fact, type) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [firstName, lastName, role, photo, description, funFact, type]
    );
    return result.rows[0];
  }catch(err){
    console.log(err);
    throw new DatabaseError('Could not create member');
  }
}