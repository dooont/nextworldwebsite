import React, { useState, useEffect } from 'react';
import ArticleForm from '../../components/admin/ArticleForm.jsx';
import ItemsList from '../../components/admin/ItemsList.jsx';

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
          <ArticleForm />
          <ItemsList items='Articles' />  
        </div>
      </div>
    </div>
  );
}
