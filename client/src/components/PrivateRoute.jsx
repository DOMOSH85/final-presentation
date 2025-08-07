import { Navigate, Outlet } from 'react-router-dom';

// Usage: <PrivateRoute roles={['farmer']} />
const PrivateRoute = ({ roles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // or use context/store

  if (!user || !user.token) {
    return <Navigate to="/signin" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
