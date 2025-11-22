import { api } from "../api/axios.js";

export async function getArticles(){
  return (await api.get("/articles")).data.map(article => {
    article.date = article.date.split('T')[0];
    return article;
  });
} //returns an array of articles with the date formatted as YYYY-MM-DD

export function createArticle(article){
  return api.post('/articles', article);
}

export function deleteArticleById(id){
  return api.delete(`/articles/${id}`);
}

export function editArticle(id, article){
  return api.put(`/articles/${id}`, article);
}