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

export async function updateArticle(id, title='', source='', date='', description='', link=''){
  try{
    const result = await dbPool.query(
      'UPDATE articles SET title = $1, source = $2, date = $3, description = $4, link = $5 WHERE id = $6 RETURNING *',
      [title, source, date, description, link, id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Article not found', 404);
    }
  }catch(err){
    console.log("custom erro:", err);
    throw new DatabaseError('Could not update article');
  }
}

export async function findAllArticles(){
  try{
    const result = await dbPool.query(
      'SELECT * FROM articles'
    );
    
    return result.rows;
  }catch(err){
    throw new DatabaseError('Could not retrieve articles');
  }
}

export async function deleteArticleById(id){
  try{
    const result = await dbPool.query(
      'DELETE FROM articles WHERE id = $1 RETURNING *',
      [id]
    );
    
    if(result.rows.length === 0){
      throw new DatabaseError('Article not found', 404);
    }
  }catch(err){
    if(err instanceof DatabaseError){
      throw err;
    }
    throw new DatabaseError('Could not delete article');
  }
}