import { createArticle, editArticle } from "../services/articlesService.js";
import { AppError } from "../errors/AppError.js";

export async function addArticle(req, res){
  const {title, source, date, description, link} = req.body;
  await createArticle(title, source, date, description, link);
  res.status(200).send();
}

export async function updateArticle(req, res){
  const { id } = req.params;
  const {title, source, date, description, link} = req.body;
  
  await editArticle(id, title, source, date, description, link);
  res.status(200).send();
}