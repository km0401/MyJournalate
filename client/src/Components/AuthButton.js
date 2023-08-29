import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AuthButton() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
}

export default AuthButton;
