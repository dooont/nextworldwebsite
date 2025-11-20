import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm.jsx';
import ItemsList from './ItemsList.jsx';
import useArticles from '../../hooks/useArticles.jsx';
import ArticleCard from './ArticleCard.jsx';


export default function ArticlesAdmin() {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
    {/* form */}
    <ArticleForm article={editingArticle}/>
    <ItemsList itemsName='Articles' CardComponent={ArticleCard} useFetchHook={useArticles} emptyMessage='No articles yet. Add your first one!' onEdit={handleArticleEditClick}/>  
  </div>
  );
}
