import { api } from "../api/axios.js";

export function getArticles(){
  return api.get("/articles");
}

export function createArticle(article){
  return api.post('/articles', article);
}

export function deleteArticleById(id){
  return api.delete(`/articles/${id}`);
}