import React from 'react';

const CTASection = ({ onSignUp }) => (
  <section className="my-12 flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">Ready to join the movement?</h2>
    <p className="mb-6 text-gray-700 max-w-xl text-center">Sign up today to access smart tools, connect with experts, and help shape a sustainable future for our land and communities.</p>
    <button
      onClick={onSignUp}
      className="px-8 py-3 bg-green-700 text-white rounded-lg font-semibold shadow-lg hover:bg-green-800 transition text-lg"
    >
      Get Started
    </button>
  </section>
);

export default CTASection;
