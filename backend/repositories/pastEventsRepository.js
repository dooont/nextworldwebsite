import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";
import { deleteImageFromS3 } from "../services/uploadsService.js";

export async function savePastEventWithArtists(flyerUrl, title, date, description, place, artists) {
  const client = await dbPool.connect();

  try {
    await client.query('BEGIN');

    const eventResult = await client.query(
      'INSERT INTO past_events(flyer, title, subtitle, description, place) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [flyerUrl, title, date, description, place]
    );
    const insertedEvent = eventResult.rows[0];

    for (const artist of artists) {
      const existingArtistResult = await client.query(
        'SELECT * FROM artists WHERE contact = $1',
        [artist.contact]
      );

      let artistId;
      if (existingArtistResult.rows.length > 0) {
        artistId = existingArtistResult.rows[0].id;
      } else {
        //create new artist if doesn't exist
        const newArtistResult = await client.query(
          'INSERT INTO artists (name, contact) VALUES ($1, $2) RETURNING *',
          [artist.name, artist.contact]
        );
        artistId = newArtistResult.rows[0].id;
      }

      //add artist to past event
      await client.query(
        'INSERT INTO past_events_artists (past_event_id, artist_id) VALUES ($1, $2)',
        [insertedEvent.id, artistId]
      );
    }

    await client.query('COMMIT');
    return insertedEvent;

  } catch (err) {
    await client.query('ROLLBACK');
    throw new DatabaseError('Could not create past event with artists', 500, err);
  } finally {
    client.release();
  }
}

/**
 * 
 * @param {number} id - Deletes a past event by id. Including s3 flyer
 * 
 */
export async function deletePastEventById(id) {
  const client = await dbPool.connect();

  try {
    await client.query('BEGIN');

    const deletedEvent = await client.query(
      /*sql*/
      `
      DELETE FROM past_events
      WHERE id = $1
      RETURNING id,
      flyer AS "flyerUrl"`,
      [id]
    );

    if (deletedEvent.rows.length === 0) {
      throw new DatabaseError('Past event not found', 404);
    }

    //delete event from join table
    await client.query('DELETE FROM past_events_artists WHERE past_event_id = $1', [id]);

    //find orpahned artists (artists in no other events)
    const { rows: orphanedArtists } = await client.query(
      /*sql*/
      `SELECT * FROM past_events_artists pea
        RIGHT JOIN artists a ON pea.artist_id = a.id
        WHERE past_event_id IS NULL;`
    );

    //remove said orphaned artists
    for (const artist of orphanedArtists) {
      await client.query(
        /*sql*/
        `DELETE FROM artists
        WHERE id = $1`,
        [artist.id]
      );
    }

    const flyerKey = new URL(deletedEvent.rows[0].flyerUrl).pathname.slice(1);
    //delete flyer from s3
    await deleteImageFromS3(flyerKey);

    await client.query('COMMIT');
    return deletedEvent.rows[0];

  } catch (err) {
    await client.query('ROLLBACK');
    if (err instanceof DatabaseError) {
      throw err;
    }
    console.log(err);
    throw new DatabaseError('Could not delete past event', 500, err);
  } finally {
    client.release();
  }
}

export async function findAllPastEvents() {
  try {
    const { rows: allPastEvents } = await dbPool.query(
      /*sql*/
      `SELECT 
        id,
        flyer AS "flyerUrl",
        title,
        subtitle AS "date",
        description,
        place
      FROM past_events`
    );

    const returnPastEvents = [];

    //add artists to events
    for (const storedEvent of allPastEvents) {
      let parsedEvent = {
        id: storedEvent.id,
        flyerUrl: storedEvent.flyerUrl,
        title: storedEvent.title,
        date: storedEvent.date,
        description: storedEvent.description,
        artists: [],
        place: storedEvent.place
      };

      const storedEventsArtistsResult = await dbPool.query(
        /*sql*/
        `SELECT * 
        FROM past_events_artists pea
        RIGHT JOIN artists a ON a.id = pea.artist_id
        WHERE past_event_id = $1`,
        [storedEvent.id]
      );

      if (storedEventsArtistsResult.rows.length > 0) {
        for (const eventArtist of storedEventsArtistsResult.rows) {
          parsedEvent.artists.push({
            id: eventArtist.id,
            name: eventArtist.name,
            contact: eventArtist.contact
          });
        }
      }

      returnPastEvents.push(parsedEvent);
    }

    return returnPastEvents;
  } catch (err) {
    throw new DatabaseError('Could not retrieve past events', 500, err);
  }
}

export async function editPastEventById(id, flyerUrl, title, date, description, place, artists) {
  const client = await dbPool.connect();
  try {
    await client.query('BEGIN');

    //update past event
    const result = await client.query(
      /*sql*/`
      UPDATE past_events
      SET flyer = $1,
      title = $2,
      subtitle = $3,
      description = $4,
      place = $5
      WHERE id = $6
      RETURNING *
      `, [flyerUrl, title, date, description, place, id]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError('Past Event not found');
    }

    await client.query(
      /*sql*/
      `
      DELETE FROM past_events_artists
      WHERE past_event_id = $1
      `, [id]
    );

    await addArtistsToEvent(client, id, artists);

    await removeOrphanedArtists(client);

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log('Your error: ', err);
    if(err instanceof DatabaseError){
      throw err
    }
    throw new DatabaseError('Could not update past event', 500, err);
  } finally {
    await client.release();
  }
}

//associates array of artists with event, without creating duplicate artists (compares contact)
async function addArtistsToEvent(client, eventId, artists){
  for (const artist of artists) {

    //get all artists from event
    const existingArtistResult = await client.query(
      'SELECT * FROM artists WHERE contact = $1',
      [artist.contact]
    );

    //check if current artist exists already
    let artistId;
    if (existingArtistResult.rows.length > 0) {
      //use existing id if exists
      artistId = existingArtistResult.rows[0].id;
    } else {
      //create new artist if doesn't exist
      const newArtistResult = await client.query(
        'INSERT INTO artists (name, contact) VALUES ($1, $2) RETURNING *',
        [artist.name, artist.contact]
      );
      artistId = newArtistResult.rows[0].id;
    }

    //add artist to past event
    await client.query(
      'INSERT INTO past_events_artists (past_event_id, artist_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [eventId, artistId]
    );
  }
}

//removes orphaned artists (artists no longer in any event)
async function removeOrphanedArtists(client){
  await client.query(
    /*sql*/
    `
    DELETE FROM artists
    WHERE NOT EXISTS (
      SELECT 1 
      FROM past_events_artists 
      WHERE past_events_artists.artist_id = artists.id
      );
    `
  )
}