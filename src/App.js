import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import NavDropdown from 'react-bootstrap/NavDropdown';

import { Navbars } from './Navbars';
import { TheHome } from './TheHome';
import { AdminDashboard } from './AdminDashboard';
import { TeachersDashboard } from './TeachersDashboard';




function App() {
  return (
    <div className="App">
    <Navbars />
    <Routes>
    <Route path="/" element={  <TheHome />} />
    <Route path="/students" element={  <AdminDashboard />} />
    <Route path="teacher" element={ <TeachersDashboard />} />
    </Routes>
    </div>
  );
}


export default App;
