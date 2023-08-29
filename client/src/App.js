import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0Config from './Auth0Config';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Journals from './Pages/Journals';
import Navigation from './Components/Navigation';

function App() {
  return (
    <Router>
      <Auth0Provider
        domain={Auth0Config.domain}
        clientId={Auth0Config.clientId}
        redirectUri={Auth0Config.redirectUri}
      >
      <Navigation/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<Journals/>} />
        </Routes>
      </Auth0Provider>
    </Router>
  );
}

export default App;
