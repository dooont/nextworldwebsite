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
    throw new DatabaseError('Could not create member');
  }
}

export async function updateMember(id, firstName='', lastName='', role='', photo='', description='', funFact='', type=''){
  try{
    const result = await dbPool.query(
      'UPDATE members SET first_name = $1, last_name = $2, role = $3, photo = $4, description = $5, fun_fact = $6, type = $7 WHERE id = $8 RETURNING *',
      [firstName, lastName, role, photo, description, funFact, type, id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Member not found', 404);
    }
    
    return result.rows[0];
  }catch(err){
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not update member');
  }
}

export async function deleteMemberById(id){
  try{
    const result = await dbPool.query(
      'DELETE FROM members WHERE id = $1 RETURNING *',
      [id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Member not found', 404);
    }
    
    return result.rows[0];
  }catch(err){
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not delete member');
  }
}

export async function findMembersByType(type=''){
  try{
    const result = await dbPool.query(
      'SELECT * FROM members WHERE type = $1',
      [type]
    );
    return result.rows;
  }catch(err){
    throw new DatabaseError('Could not retrieve members');
  }
}