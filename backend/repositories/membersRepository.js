import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";
import { deleteImageFromS3 } from "../services/uploadsService.js";

export async function saveMember(firstName, lastName, role, photoUrl, description, funFact, type = '') {
  try {
    const result = await dbPool.query(
      /*sql*/
      `INSERT INTO members(first_name, last_name, role, photo, description, fun_fact, type)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [firstName, lastName, role, photoUrl, description, funFact, type]
    );
    return result.rows[0];
  } catch (err) {
    throw new DatabaseError('Could not create member');
  }
}

export async function updateMember(id, firstName, lastName, role, photoUrl, description, funFact, type) {
  try {
    const result = await dbPool.query(
      /*sql*/
      `UPDATE members
      SET first_name = $1,
      last_name = $2,
      role = $3,
      photo = $4,
      description = $5,
      fun_fact = $6,
      type = $7
      WHERE id = $8
      RETURNING *`,
      [firstName, lastName, role, photoUrl, description, funFact, type, id]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError('Member not found', 404);
    }

    return result.rows[0];
  } catch (err) {
    if (err instanceof DatabaseError) {
      throw err;
    }
    throw new DatabaseError('Could not update member');
  }
}

/**
 * Deletes member and its s3 image
 * @param {*} id 
 * @returns 
 */
export async function deleteMemberById(id) {
  const client = await dbPool.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query(
      /*sql*/
      `DELETE FROM members
      WHERE id = $1
      RETURNING id, photo AS "photoUrl"`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError('Member not found', 404);
    }

    const deletedMember = result.rows[0];
    const imageKey = new URL(deletedMember.photoUrl).pathname.slice(1);
    await deleteImageFromS3(imageKey);

    client.query('COMMIT');
  } catch (err) {
    client.query('ROLLBACK');

    if (err instanceof DatabaseError) {
      throw err;
    }

    throw err;
  } finally {
    client.release();
  }
}

export async function findMembersByType(type) {
  try {
    const result = await dbPool.query(
      /*sql*/
      `SELECT 
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      role,
      photo AS "photoUrl",
      description,
      fun_fact AS "funFact",
      type
      FROM members
      WHERE type = $1`,
      [type]
    );
    return result.rows;
  } catch (err) {
    throw new DatabaseError('Could not retrieve members');
  }
}