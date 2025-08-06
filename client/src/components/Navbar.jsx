import React from 'react';


const Navbar = ({ onSignIn, onSignUp }) => (
  <nav className="flex justify-between items-center px-8 py-4 bg-green-800 text-white">
    <div className="font-bold text-2xl">Sustainable Land</div>
    <div>
      <button onClick={onSignIn} className="mr-4 px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition">Sign In</button>
      <button onClick={onSignUp} className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition">Sign Up</button>
    </div>
  </nav>
);

export default Navbar;
