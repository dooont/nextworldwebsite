import { saveArticle } from "../repositories/articlesRepository.js";

export async function createArticle(title, source, date, description, link){
  await saveArticle(title, source, date, description, link);
}