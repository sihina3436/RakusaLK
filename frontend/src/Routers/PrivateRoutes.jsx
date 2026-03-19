import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useVerifyTokenQuery } from '../redux/auth/authApi';

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();
  const { data, isLoading, isError } = useVerifyTokenQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        Verifying...
      </div>
    );
  }

  if (isError || !data?.valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && data?.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;