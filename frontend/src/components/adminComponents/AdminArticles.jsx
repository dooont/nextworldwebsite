import axios from 'axios';
import NewArticleForm from './NewArticleForm';
/*
title
source
date "YYYY-MM-DD"
description
link
*/
export default function AdminArticles({ articles, handleRefresh }) {

  async function handleDeleteArticle(articleId) {
    try {
      const response = await axios.delete("http://localhost:3000/articles/" + articleId, {
        withCredentials: true
      });
      handleRefresh();
    } catch (e) {
      console.log(e.response);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-22">
      <NewArticleForm onSuccess={handleRefresh}/>
      {articles.map((article) => (
        <article key={article.id} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col">
          <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{article.source} • {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
          }).format(new Date(article.date.split('T')[0]))}</p>
          <p className="flex-1 oswald-400 mb-4">{article.description}</p>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-blue-400 hover:underline"
          >
            Read More
          </a>
          <button onClick={() => { handleDeleteArticle(article.id) }} className="bg-red-500 hover:bg-black transition">Delete</button>
        </article>
      ))}
    </div>
  )
}