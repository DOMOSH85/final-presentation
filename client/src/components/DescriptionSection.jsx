import React from 'react';

const description = `Sustainable land management is the use of land resources, including soils, water, animals, and plants, for the production of goods to meet changing human needs while ensuring the long-term productive potential of these resources and the maintenance of their environmental functions. Our platform empowers farmers and government agencies to collaborate for a greener, more resilient future.`;

const bulletPoints = [
  'Promoting soil health and biodiversity',
  'Efficient water management and conservation',
  'Restoration of degraded lands',
  'Smart crop planning and sustainable agriculture',
  'Transparent farmer-government collaboration',
  'Education, training, and digital tools for all stakeholders',
];

const DescriptionSection = () => (
  <section className="mb-12">
    <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 animate-fade-in">Sustainable Land Management</h1>
    <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in delay-100">
      {description}
    </p>
    <div className="text-base md:text-lg text-gray-600">
      <ul className="list-disc list-inside text-left max-w-2xl mx-auto">
        {bulletPoints.map((text, idx) => (
          <li
            key={text}
            className="opacity-0 translate-x-8 animate-slide-in-right"
            style={{
              animationDelay: `${0.3 + idx * 0.15}s`,
              animationFillMode: 'forwards',
            }}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default DescriptionSection;
