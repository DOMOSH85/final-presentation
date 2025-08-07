import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import DescriptionSection from './components/DescriptionSection';
import ServiceCards from './components/ServiceCards';
import CTASection from './components/CTASection';
import TestimonialSection from './components/TestimonialSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
        <Navbar onSignIn={() => setShowSignIn(true)} onSignUp={() => setShowSignUp(true)} />
        <main className="flex-1 px-4 py-12 max-w-5xl mx-auto text-center">
          <DescriptionSection />
          <ServiceCards />
          <CTASection onSignUp={() => setShowSignUp(true)} />
          <TestimonialSection />
          <NewsletterSection />
        </main>
        <Footer />
        <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
        <SignUpModal open={showSignUp} onClose={() => setShowSignUp(false)} onShowSignIn={handleShowSignIn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
