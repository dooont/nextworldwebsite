import React, { useState, useEffect } from 'react';
import ArticleForm from '../../components/admin/ArticleForm.jsx';
import ItemsList from '../../components/admin/ItemsList.jsx';
import useArticles from '../../hooks/useArticles.jsx';
import ArticleCard from '../../components/admin/ArticleCard.jsx';


export default function AdminDashboard() {
  const [editingArticle, setEditingArticle] = useState(null);

  function handleArticleEditClick(article){
    setEditingArticle((prev) => {
      if(prev?.id === article.id){
        return null;
      }
      return article;
    });
  }
  
  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-white racing-sans-one-regular mb-2">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* form */}
          <ArticleForm article={editingArticle}/>
          <ItemsList itemsName='Articles' CardComponent={ArticleCard} useFetchHook={useArticles} emptyMessage='No articles yet. Add your first one!' onEdit={handleArticleEditClick}/>  
        </div>
      </div>
    </div>
  );
}
