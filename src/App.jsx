import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Feed from './pages/Feed'; 
import SeedCommunities from './SeedCommunities';
import Navbar from './components/Navbar'; 
import CommunityPage from './pages/CommunityPage';


function App() {
  return (
    <Router>
      {/* */}
      <Navbar />

      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/seed" element={<SeedCommunities />} />
        <Route path="/c/:communityId" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
