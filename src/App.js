import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Ofertas from './Ofertas'; 


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ofertas" element={<Ofertas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
