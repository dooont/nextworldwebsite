import { createArticle } from "../services/articlesService.js";

export async function addArticle(req, res){
  const {title, source, date, description, link} = req.body;
  await createArticle(title, source, date, description, link);
  res.status(200).send();
}