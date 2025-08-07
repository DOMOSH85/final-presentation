import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import DescriptionSection from './components/DescriptionSection';
import ServiceCards from './components/ServiceCards';
import CTASection from './components/CTASection';
import TestimonialSection from './components/TestimonialSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

import FarmerDashboard from './components/FarmerDashboard';
import FarmerCrops from './components/FarmerCrops';
import GovernmentDashboard from './components/GovernmentDashboard';
import GovernmentSchemes from './components/GovernmentSchemes';

function AppRouter() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setShowSignIn(false);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
        <Navbar
          user={user}
          onSignIn={() => setShowSignIn(true)}
          onSignUp={() => setShowSignUp(true)}
          onSignOut={handleSignOut}
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
            <FarmerRoutes user={user} /> :
            <Navigate to="/" />
          } />
          
          <Route path="/government/*" element={
            user && user.role === 'government' ?
            <GovernmentRoutes user={user} /> :
            <Navigate to="/" />
          } />
        </Routes>
        <Footer />
        <SignInModal
          open={showSignIn}
          onClose={() => setShowSignIn(false)}
          onSignIn={handleSignIn}
        />
        <SignUpModal
          open={showSignUp}
          onClose={() => setShowSignUp(false)}
        />
      </div>
    </Router>
  );
}

function FarmerRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<FarmerDashboard user={user} />} />
      <Route path="/dashboard" element={<FarmerDashboard user={user} />} />
      <Route path="/crops" element={<FarmerCrops user={user} />} />
    </Routes>
  );
}

function GovernmentRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<GovernmentDashboard user={user} />} />
      <Route path="/dashboard" element={<GovernmentDashboard user={user} />} />
      <Route path="/schemes" element={<GovernmentSchemes user={user} />} />
    </Routes>
  );
}

export default AppRouter;
