import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

// Import Pages
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import LibraryPage from './Components/Pages/LibraryPage';
import MarketplacePage from './Components/Pages/MarketplacePage';
import ExchangePage from './Components/Pages/ExchangePage';
import CommunityPage from './Components/Pages/CommunityPage';
import ProfilePage from './Components/Pages/ProfilePage';
import SearchPage from './Components/Pages/SearchPage';
import BookDetailsPage from './Components/Pages/BookDetailsPage';
import SellerLoginPage from './Components/Pages/SellerLoginPage';
import UserLoginPage from './Components/Pages/UserLoginPage';
import SellerSignupPage from './Components/Pages/SellerSignupPage';
import ClaimBookPage from './Components/Pages/ClaimBookPage';
import SellBookPage from './Components/Pages/SellBookPage';

// Gamification Pages
import GamificationPage from './Components/Pages/GamificationPage';
import BadgesPage from './Components/Pages/BadgesPage';
import KoinsPage from './Components/Pages/KoinsPage';
import TriviaPage from './Components/Pages/TriviaPage';
import GuessPage from './Components/Pages/GuessPage';
import StreakPage from './Components/Pages/StreakPage';
import ScratchPage from './Components/Pages/ScratchPage';
import ProgressPage from './Components/Pages/ProgressPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/seller-login" element={<SellerLoginPage />} />
          <Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/seller-signup" element={<SellerSignupPage />} />

          {/* ===== PROTECTED ROUTES ===== */}
          <Route path="/library" element={
            <ProtectedRoute><LibraryPage /></ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute><MarketplacePage /></ProtectedRoute>
          } />
          <Route path="/claim-book" element={
            <ProtectedRoute><ClaimBookPage /></ProtectedRoute>
          } />
          {/* ✅ SellBookPage - No role required, any logged-in user can access */}
          <Route path="/sell-book" element={
            <ProtectedRoute><SellBookPage /></ProtectedRoute>
          } />
          <Route path="/exchange" element={
            <ProtectedRoute><ExchangePage /></ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute><CommunityPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute><SearchPage /></ProtectedRoute>
          } />
          <Route path="/book/:bookId" element={
            <ProtectedRoute><BookDetailsPage /></ProtectedRoute>
          } />
          
          {/* ===== GAMIFICATION ROUTES ===== */}
          <Route path="/gamification" element={
            <ProtectedRoute><GamificationPage /></ProtectedRoute>
          } />
          <Route path="/gamification/badges" element={
            <ProtectedRoute><BadgesPage /></ProtectedRoute>
          } />
          <Route path="/gamification/koins" element={
            <ProtectedRoute><KoinsPage /></ProtectedRoute>
          } />
          <Route path="/gamification/trivia" element={
            <ProtectedRoute><TriviaPage /></ProtectedRoute>
          } />
          <Route path="/gamification/guess" element={
            <ProtectedRoute><GuessPage /></ProtectedRoute>
          } />
          <Route path="/gamification/streak" element={
            <ProtectedRoute><StreakPage /></ProtectedRoute>
          } />
          <Route path="/gamification/scratch" element={
            <ProtectedRoute><ScratchPage /></ProtectedRoute>
          } />
          <Route path="/gamification/progress" element={
            <ProtectedRoute><ProgressPage /></ProtectedRoute>
          } />
          
          {/* ===== 404 ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;