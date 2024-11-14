import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const buddieAuthToken = localStorage.getItem('buddieAuthToken');

  if (!buddieAuthToken) {
    // If no authToken is found, redirect to the login page
    return <Navigate to="/" />;
  } 


  // If authToken exists, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
