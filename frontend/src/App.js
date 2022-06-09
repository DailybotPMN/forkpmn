import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Layouts/Home';
import Discord from './Layouts/Discord';
import Slack from './Layouts/Slack';
import Contact from './Layouts/Contact';

export default function App() {
    return (
        <Router> 
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Discord"element={<Discord/>} />
            <Route path="/Slack" element={<Slack/>} />
            <Route path="/Contact" element={<Contact/>} />
          </Routes>
        </Router>
    );
};