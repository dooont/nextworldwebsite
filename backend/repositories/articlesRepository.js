import dbPool from "./pool.js";
import DatabaseError from "../errors/DatabaseError.js";

export async function saveArticle(title='', source='', date='', description='', link=''){
  try{
    await dbPool.query(
      'INSERT INTO articles(title, source, date, description, link) VALUES($1, $2, $3, $4, $5)',
    [title, source, date, description, link]);
  }catch(err){
    throw new DatabaseError('Could not complete request');
  }
}