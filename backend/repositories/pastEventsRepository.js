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