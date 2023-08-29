import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Route {...rest} element={element} />;
  }
}

export default ProtectedRoute;
