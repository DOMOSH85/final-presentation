import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FarmerPortal from './components/FarmerPortal';
import GovernmentPortal from './components/GovernmentPortal';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';

const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/signin';
};

const AppRoutes = () => (
  <Routes>
    <Route path="/signin" element={<SignInModal open={true} onClose={() => window.location.href = '/'} />} />
    <Route path="/signup" element={<SignUpModal open={true} onClose={() => window.location.href = '/'} onShowSignIn={() => window.location.href = '/signin'} />} />
    <Route element={<PrivateRoute roles={["farmer"]} />}>
      <Route path="/farmer-portal" element={<FarmerPortal onLogout={handleLogout} />} />
    </Route>
    <Route element={<PrivateRoute roles={["government"]} />}>
      <Route path="/government-portal" element={<GovernmentPortal onLogout={handleLogout} />} />
    </Route>
    <Route path="/" element={<Navigate to="/signin" />} />
    <Route path="*" element={<Navigate to="/signin" />} />
  </Routes>
);

export default AppRoutes;
