import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import Router from './AppRoutes';
import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, []);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
