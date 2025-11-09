import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function saveUpcomingEvent(title='', subtitle='', url='', image=''){
  try{
    await dbPool.query(
      'INSERT INTO upcoming_events(title, subtitle, url, flyer_url) VALUES($1, $2, $3, $4)',
      [title, subtitle, url, image]
    );
  }catch(err){
    throw new DatabaseError('Could not complete request');
  }
}

export async function updateUpcomingEvent(id, title='', subtitle='', url='', image=''){
  try{
    const result = await dbPool.query(
      'UPDATE upcoming_events SET title = $1, subtitle = $2, url = $3, flyer_url = $4 WHERE id = $5 RETURNING *',
      [title, subtitle, url, image, id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Upcoming event not found', 404);
    }
  }catch(err){
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not update upcoming event');
  }
}

export async function deleteUpcomingEventById(id){
  try{
    const result = await dbPool.query(
      'DELETE FROM upcoming_events WHERE id = $1 RETURNING *',
      [id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Upcoming event not found', 404);
    }
  }catch(err){
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not delete upcoming event');
  }
}

export async function findAllUpcomingEvents(){
  try{
    const result = await dbPool.query(
      'SELECT * FROM upcoming_events'
    );
    return result.rows;
  }catch(err){
    throw new DatabaseError('Could not retrieve upcoming events');
  }
}