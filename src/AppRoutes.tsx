import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// imports pages
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/Register/Register';
import Chat from './pages/Chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
