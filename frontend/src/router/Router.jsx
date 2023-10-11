import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';

import App from '../App';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import User from '../pages/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
]);

export default router;
