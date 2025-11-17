import React, { useState, useEffect } from 'react';
import ArticlesForm from '../../components/admin/ArticlesForm.jsx';

const API_BASE_URL = 'http://localhost:3000';

export default function AdminDashboard() {
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
          <ArticlesForm />
          {/* articles list */}
          {/*
          <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-400">
            <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
              All Articles
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400 oswald-400">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 oswald-400">No articles yet. Create your first article!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    className="bg-black border border-purple-900 rounded-lg p-5 hover:border-purple-700 transition"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2 oswald-700">
                      {article.title}
                    </h3>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 oswald-400 text-sm break-all transition"
                    >
                      {article.link}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>*/}
        </div>
      </div>
    </div>
  );
}
