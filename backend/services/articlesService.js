import { saveArticle, updateArticle, findAllArticles, deleteArticleById } from "../repositories/articlesRepository.js";

export async function createArticle(title, source, date, description, link){
  await saveArticle(title, source, date, description, link);
}

export async function editArticle(id, title, source, date, description, link){
  return await updateArticle(id, title, source, date, description, link);
}

export async function getAllArticles(){
  return await findAllArticles();
}

export async function removeArticle(id){
  await deleteArticleById(id);
}