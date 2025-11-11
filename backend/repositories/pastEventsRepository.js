import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function savePastEventWithArtists(flyer='', title='', subtitle='', description='', place='', artists=[]){
  const client = await dbPool.connect();
  
  try{
    await client.query('BEGIN');
    
    const eventResult = await client.query(
      'INSERT INTO past_events(flyer, title, subtitle, description, place) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [flyer, title, subtitle, description, place]
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
    
  }catch(err){
    await client.query('ROLLBACK');
    throw new DatabaseError('Could not create past event with artists');
  }finally{
    // Release client back to pool
    client.release();
  }
}

export async function deletePastEventById(id=''){
  const client = await dbPool.connect();
  
  try{
    await client.query('BEGIN');
    
    const deletedEvent = await client.query(
      'DELETE FROM past_events WHERE id = $1 RETURNING *',
      [id]
    );
    
    if(deletedEvent.rows.length === 0){
      throw new DatabaseError('Past event not found', 404);
    }
    
    //delete event from join table
    await client.query('DELETE FROM past_events_artists WHERE past_event_id = $1', [id]);
    
    //find orpahned artists (in no other events)
    const orphanedArtists = await client.query(
        `SELECT * FROM past_events_artists pea
        RIGHT JOIN artists a ON pea.artist_id = a.id
        WHERE past_event_id IS NULL;`
      );

    //remove said orphaned artists
    for(const artist of orphanedArtists){
      await client.query(
        'DELETE FROM artists WHERE id = $1',
        [artist.id]
      );
    }

    await client.query('COMMIT');
    return deletedEvent.rows[0];
    
  }catch(err){
    await client.query('ROLLBACK');
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not delete past event');
  }finally{
    client.release();
  }
}

export async function findAllPastEvents(){
  try{
    const {rows: allPastEvents} = await dbPool.query('SELECT * FROM past_events');
    
    const returnPastEvents = [];
    
    for (const storedEvent of allPastEvents) {
      let parsedEvent = {
        id: storedEvent.id,
        flyer: storedEvent.flyer,
        title: storedEvent.title,
        subtitle: storedEvent.subtitle,
        description: storedEvent.description,
        artists: [],
        place: storedEvent.place
      };
      
      const storedEventsArtistsResult = await dbPool.query(
        `SELECT * FROM past_events_artists pea
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
  }catch(err){
    throw new DatabaseError('Could not retrieve past events');
  }
}