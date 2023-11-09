import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from 'components/Footer';
import Header from 'components/Header';

import './normalize.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer style={{ minWidth: '25vw' }} />
    </div>
  );
}

export default App;
