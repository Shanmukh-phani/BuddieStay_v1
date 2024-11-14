import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // If no authToken is found, redirect to the login page
    return <Navigate to="/admin-login" />;
  } 


  // If authToken exists, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
