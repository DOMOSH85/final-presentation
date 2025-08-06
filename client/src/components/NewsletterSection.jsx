import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      setStatus('Thank you for subscribing!');
      setEmail('');
    } else {
      setStatus('Subscription failed. Try again.');
    }
  };

  return (
    <section className="my-16 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">Stay Updated</h2>
      <p className="mb-4 text-gray-700 max-w-xl text-center">Subscribe to our newsletter for the latest updates on sustainable land management and technology.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition">Subscribe</button>
      </form>
      {status && <div className="mt-2 text-green-700 font-semibold">{status}</div>}
    </section>
  );
};

export default NewsletterSection;
