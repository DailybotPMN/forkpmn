import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Discord from './Components/Discord';
import Slack from './Components/Slack';

export default function App() {
    return (
        <Router> 
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Discord"element={<Discord/>} />
            <Route path="/Slack" element={<Slack/>} />
            {/* <Route exact path="/Contact" element={<Contact/>} /> */}
            {/* <Route component={notfound} /> */}
          </Routes>
        </Router>

    );
};