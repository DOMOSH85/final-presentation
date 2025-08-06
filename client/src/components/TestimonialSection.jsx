import React, { useEffect, useState } from 'react';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="my-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-800">What Our Users Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 max-w-xs animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <p className="italic text-gray-700 mb-4">“{t.message}”</p>
            <div className="font-bold text-green-900">{t.name}</div>
            <div className="text-sm text-gray-500">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
