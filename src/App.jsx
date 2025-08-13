import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Feed from './pages/Feed'; 
import SeedCommunities from './SeedCommunities';
import Navbar from './components/Navbar'; 
import CommunityPage from './pages/CommunityPage';
import SeedPosts from './pages/SeedPosts';
import PostDetail from './pages/PostDetail';

function AppWrapper() {
  const location = useLocation();
  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/seed" element={<SeedCommunities />} />
        <Route 
          path="/c/:communityId" 
          element={<CommunityPage currentUserId={currentUserId} />} 
        />
        <Route path="/seed-posts" element={<SeedPosts />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
