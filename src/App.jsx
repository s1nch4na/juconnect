import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Feed from './pages/Feed';
import Home from './pages/Home'; 
import SeedCommunities from './SeedCommunities';
import Navbar from './components/Navbar'; 
import CommunityPage from './pages/CommunityPage';


function App() {
  return (
    <Router>
      {/* */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
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
