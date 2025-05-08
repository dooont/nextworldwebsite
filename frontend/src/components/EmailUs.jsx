import React, { useState } from 'react';

export default function EmailUsFooter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href =
      `mailto:nxtworld7@gmail.com` +
      `&body=${encodeURIComponent(
        `From: ${email}\n\n${message}`
      )}`;

    alert('Your message has been sent!');
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-4 bebas-kai-regular">Email Us</h3>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setEmail('');
            setMessage('');
            setSubject('');
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            required
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-3 bg-black border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 oswaldo-400"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-black border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 oswaldo-400"
          />
          <textarea
            rows="4"
            required
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 bg-black border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 sm:col-span-2 oswaldo-400"
          />
          <button
            type="submit"
            className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded transition bebas-kai-regular"
          >
            Send Message
          </button>
        </form>
      </div>
    </footer>
  );
}
