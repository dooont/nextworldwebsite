import { useMutation } from '@tanstack/react-query';
import { api } from '../../api/axios.js';
import { useState } from 'react';

export default function ArticlesForm(){
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    date: '',
    description: '',
    link: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm.mutate(formData);
  };

  const submitForm = useMutation({
    mutationFn: (data) => {
      return api.post('/articles', data);
    },
    onSuccess: () => {
      // Reset form on success
      setFormData({
        title: '',
        source: '',
        date: '',
        description: '',
        link: ''
      });
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return(
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-200">
            <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
              Create New Article
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* title */}
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="Article title"
                />
              </div>

              {/* source */}
              <div>
                <label 
                  htmlFor="source" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Source
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="Source name"
                />
              </div>

              {/* date */}
              <div>
                <label 
                  htmlFor="date" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="e.g., April 2025"
                />
              </div>

              {/* description */}
              <div>
                <label 
                  htmlFor="description" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition resize-none"
                  placeholder="Article description"
                />
              </div>

              {/* link */}
              <div>
                <label 
                  htmlFor="link" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="https://example.com/article"
                />
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="w-full py-3 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold oswald-700 text-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/50"
              >
                Create Article
              </button>
            </form>
          </div>
  )
}