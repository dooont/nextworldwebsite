import React, { useState } from 'react';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    inquiryBody: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const { firstName, lastName, userEmail, inquiryBody } = formData;
    if (!firstName.trim() || !lastName.trim() || !userEmail.trim() || !inquiryBody.trim()) {
      setSubmitMessage('Please fill out all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post('http://localhost:3000/inquiries', formData);

      if (response.status === 200) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          userEmail: '',
          inquiryBody: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center racing-sans-one-regular mb-10">
          Contact Us
        </h2>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2 oswald-400">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent oswald-400 text-white"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2 oswald-400">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent oswald-400 text-white"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium mb-2 oswald-400">
                Email Address *
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent oswald-400 text-white"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="inquiryBody" className="block text-sm font-medium mb-2 oswald-400">
                Message *
              </label>
              <textarea
                id="inquiryBody"
                name="inquiryBody"
                value={formData.inquiryBody}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent oswald-400 text-white resize-vertical"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            
            {submitMessage && (
              <div className={`p-4 rounded-lg text-center ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-900 text-green-100' 
                  : 'bg-red-900 text-red-100'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-950 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition duration-300 oswald-700 text-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 