import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import DescriptionSection from './components/DescriptionSection';
import ServiceCards from './components/ServiceCards';
import CTASection from './components/CTASection';
import TestimonialSection from './components/TestimonialSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

import FarmerPortal from './components/FarmerPortal';
import GovernmentPortal from './components/GovernmentPortal';

function AppRouter() {
  const { user, signOut } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignIn = () => {
    setShowSignIn(false);
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'farmer') {
      window.location.href = '/farmer';
    } else if (user?.role === 'government') {
      window.location.href = '/government';
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
        <Navbar
          user={user}
          onSignIn={() => setShowSignIn(true)}
          onSignUp={() => setShowSignUp(true)}
        />
        <Routes>
          <Route path="/" element={
            <main className="flex-1 px-4 py-12 max-w-5xl mx-auto text-center">
              <DescriptionSection />
              <ServiceCards />
              <CTASection onSignUp={() => setShowSignUp(true)} />
              <TestimonialSection />
              <NewsletterSection />
            </main>
          } />
          
          <Route path="/farmer/*" element={
            user && user.role === 'farmer' ?
            <FarmerPortal /> :
            <Navigate to="/" />
          } />
          
          <Route path="/government/*" element={
            user && user.role === 'government' ?
            <GovernmentPortal /> :
            <Navigate to="/" />
          } />
        </Routes>
        <Footer />
        <SignInModal
          open={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
        <SignUpModal
          open={showSignUp}
          onClose={() => setShowSignUp(false)}
        />
      </div>
    </Router>
  );
}

export default AppRouter;