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