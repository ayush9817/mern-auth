import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user)
  return currentUser ? <Outlet/> : <Navigate to="/sign-in" />
}

export default PrivateRoute