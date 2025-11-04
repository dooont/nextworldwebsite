import axios from 'axios';
import { useState } from 'react';
import SingleArticle from '../SingleArticle';
/*
title
source
date "YYYY-MM-DD"
description
link
*/
export default function AdminArticles({ articles, handleRefresh }) {
  const [submissionUnsuccessful, setSubmissionUnsuccessful] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    date: '',
    description: '',
    link: ''
  });

  function onChange(e) {
    setFormData((oldData) => {
      return {
        ...oldData,
        [e.target.name]: e.target.value
      }
    })
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/articles', formData, {
        withCredentials: true,
      });
      setSubmissionUnsuccessful(false);
      handleRefresh();
      e.target.reset();
    } catch (e) {
      console.log(e.response);
      setSubmissionUnsuccessful(true);
    }
  }

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
      <form onSubmit={handleSubmitForm} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-2 w-full">
        <h1 className="text-xl font-bold text-center w-full">Add New Article</h1>
        <div>
          <label htmlFor="title" className="block">title</label>
          <input onChange={onChange} placeholder="title" name="title" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="source" className="block">source name</label>
          <input onChange={onChange} placeholder="source" name="source" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="date" className="block">date</label>
          <input onChange={onChange} type="date" placeholder="date" name="date" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="description" className="block">description</label>
          <input onChange={onChange} placeholder="description" name="description" className="border-white border-1 pl-2 w-full" required />
        </div>
        <div>
          <label htmlFor="link" className="block">link</label>
          <input onChange={onChange} placeholder="link" name="link" className="border-white border-1 pl-2 w-full" required />
        </div>
        <button className="text-white bg-black mx-2 mb-2 hover:text-black hover:bg-white transition">Add Article</button>
        {submissionUnsuccessful && <p className="text-red-500">Article Not Created!</p>}
      </form>
      {articles.map((article) => (
        <SingleArticle article={article} />
      ))}
    </div>
  )
}