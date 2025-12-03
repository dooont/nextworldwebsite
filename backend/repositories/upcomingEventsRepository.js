import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";
import { deleteImageFromS3 } from "../services/uploadsService.js";

export async function saveUpcomingEvent(title, date, ticketLink, flyerUrl) {
  try {
    await dbPool.query(
      'INSERT INTO upcoming_events(title, subtitle, url, flyer_url) VALUES($1, $2, $3, $4)',
      [title, date, ticketLink, flyerUrl]
    );
  } catch (err) {
    throw new DatabaseError('Could not complete request');
  }
}

export async function updateUpcomingEvent(id, title, date, ticketLink, flyerUrl) {
  try {
    const result = await dbPool.query(
      /*sql*/
      `UPDATE upcoming_events
      SET title = $1,
      subtitle = $2,
      url = $3,
      flyer_url = $4
      WHERE id = $5`
      , [title, date, ticketLink, flyerUrl, id]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError('Upcoming event not found', 404);
    }
  } catch (err) {
    if (err instanceof DatabaseError) {
      throw err;
    }
    throw new DatabaseError('Could not update upcoming event');
  }
}

/**
 * Deletes upcoming event and it's s3 image
 * @param {*} id 
 */
export async function deleteUpcomingEventById(id) {
  const client = await dbPool.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query(
      /*sql*/
      `
      DELETE FROM upcoming_events
      WHERE id = $1
      RETURNING id, title, subtitle AS "date", url AS "ticketLink", flyer_url AS "flyerUrl"
      `, [id]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError('Upcoming event not found', 404);
    }

    const upcomingEvent = result.rows[0];
    const imageKey = new URL(upcomingEvent.flyerUrl).pathname.slice(1);
    await deleteImageFromS3(imageKey);

    client.query('COMMIT');
  } catch (err) {
    client.query('ROLLBACK');
    if (err instanceof DatabaseError) {
      throw err;
    }
    throw new DatabaseError('Could not delete upcoming event');
  } finally {
    client.release();
  }
}

export async function findAllUpcomingEvents() {
  try {
    const result = await dbPool.query(
      /*sql*/
      `SELECT
      id, 
      title,
      subtitle AS "date",
      url AS "ticketLink",
      flyer_url AS "flyerUrl"
      FROM upcoming_events`
    );
    return result.rows;
  } catch (err) {
    throw new DatabaseError('Could not retrieve upcoming events');
  }
}

export async function findUpcomingEventById(id) {
  try {
    const result = await dbPool.query(
      /*sql*/
      `
      SELECT
      id,
      title,
      subtitle AS "date",
      url AS "ticketLink",
      flyer_url AS "flyerUrl",
      FROM upcoming_events
      WHERE id = $1
      `, [id]
    );

    return result.rows[0];
  } catch (e) {
    throw new DatabaseError('Could not retrieve upcoming event');
  }
}