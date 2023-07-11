import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Pegawai from './components/Pegawai';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div><Navbar/><Dashboard /></div>} />
        <Route path="/pegawai" element={<div><Navbar/><Pegawai /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
