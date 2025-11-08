import { createArticle, editArticle, getAllArticles, removeArticle } from "../services/articlesService.js";
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

export async function getArticles(req, res){
  const articles = await getAllArticles();
  res.status(200).json({ articles });
}

export async function deleteArticle(req, res){
  const { id } = req.params;
  
  await removeArticle(id);
  res.status(200).send();
}