import React from 'react';

const services = [
  {
    title: 'Soil Health Monitoring',
    description: 'Advanced analytics and IoT sensors to monitor and improve soil quality for sustainable agriculture.',
    icon: '🌱',
  },
  {
    title: 'Water Conservation',
    description: 'Smart irrigation and water management solutions to optimize water usage and reduce waste.',
    icon: '💧',
  },
  {
    title: 'Land Restoration',
    description: 'Rehabilitation of degraded land through afforestation, erosion control, and organic practices.',
    icon: '🌳',
  },
  {
    title: 'Farmer-Government Portal',
    description: 'A digital platform for transparent communication, subsidies, and compliance tracking.',
    icon: '🤝',
  },
  {
    title: 'Sustainable Crop Planning',
    description: 'AI-driven recommendations for crop rotation, pest management, and yield optimization.',
    icon: '🌾',
  },
  {
    title: 'Education & Training',
    description: 'Workshops, e-learning, and field demonstrations for farmers and officials.',
    icon: '🎓',
  },
];

const ServiceCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-16">
    {services.map((service, idx) => (
      <div
        key={service.title}
        className="group bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl animate-fade-in"
        style={{ animationDelay: `${idx * 0.1}s` }}
      >
        <div className="text-5xl mb-4 animate-bounce-slow group-hover:animate-bounce-fast">{service.icon}</div>
        <h3 className="text-xl font-bold mb-2 text-green-800 group-hover:text-green-600 transition-colors duration-300">{service.title}</h3>
        <p className="text-gray-600 text-center">{service.description}</p>
      </div>
    ))}
  </div>
);

export default ServiceCards;
