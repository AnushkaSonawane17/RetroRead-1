import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

// Import Pages
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import DashboardPage from './Components/Pages/DashboardPage';
import LibraryPage from './Components/Pages/LibraryPage';
import MarketplacePage from './Components/Pages/MarketplacePage';
import ExchangePage from './Components/Pages/ExchangePage';
import CommunityPage from './Components/Pages/CommunityPage';
import ProfilePage from './Components/Pages/ProfilePage';
import SearchPage from './Components/Pages/SearchPage';
import BookDetailsPage from './Components/Pages/BookDetailsPage';

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
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* ===== PROTECTED ROUTES ===== */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:bookId" element={<BookDetailsPage />} />
          
          {/* ===== GAMIFICATION ROUTES ===== */}
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/gamification/badges" element={<BadgesPage />} />
          <Route path="/gamification/koins" element={<KoinsPage />} />
          <Route path="/gamification/trivia" element={<TriviaPage />} />
          <Route path="/gamification/guess" element={<GuessPage />} />
          <Route path="/gamification/streak" element={<StreakPage />} />
          <Route path="/gamification/scratch" element={<ScratchPage />} />
          <Route path="/gamification/progress" element={<ProgressPage />} />
          
          {/* ===== 404 - CATCH ALL ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;








// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';

// // Import Components
// import Navbar from './Components/Common/Navbar';
// import Footer from './Components/Common/Footer';

// // Import Pages
// import HomePage from './Components/Pages/HomePage';
// import LoginPage from './Components/Pages/LoginPage';
// import RegisterPage from './Components/Pages/RegisterPage';
// import DashboardPage from './Components/Pages/DashboardPage';
// import LibraryPage from './Components/Pages/LibraryPage';
// import MarketplacePage from './Components/Pages/MarketplacePage';
// import ExchangePage from './Components/Pages/ExchangePage';
// import CommunityPage from './Components/Pages/CommunityPage';
// import ProfilePage from './Components/Pages/ProfilePage';

// // Gamification Pages
// import GamificationPage from './Components/Pages/GamificationPage';
// import BadgesPage from './Components/Pages/BadgesPage';
// import KoinsPage from './Components/Pages/KoinsPage';
// import TriviaPage from './Components/Pages/TriviaPage';
// import GuessPage from './Components/Pages/GuessPage';
// import StreakPage from './Components/Pages/StreakPage';
// import ScratchPage from './Components/Pages/ScratchPage';
// import ProgressPage from './Components/Pages/ProgressPage';

// function App() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <main className="main-content">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
          
//           {/* Protected Routes */}
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/library" element={<LibraryPage />} />
//           <Route path="/marketplace" element={<MarketplacePage />} />
//           <Route path="/exchange" element={<ExchangePage />} />
//           <Route path="/community" element={<CommunityPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
          
//           {/* Gamification Routes */}
//           <Route path="/gamification" element={<GamificationPage />} />
//           <Route path="/gamification/badges" element={<BadgesPage />} />
//           <Route path="/gamification/koins" element={<KoinsPage />} />
//           <Route path="/gamification/trivia" element={<TriviaPage />} />
//           <Route path="/gamification/guess" element={<GuessPage />} />
//           <Route path="/gamification/streak" element={<StreakPage />} />
//           <Route path="/gamification/scratch" element={<ScratchPage />} />
//           <Route path="/gamification/progress" element={<ProgressPage />} />
          
//           {/* 404 - Catch all */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;




// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';

// // Import Components
// import Navbar from './Components/Common/Navbar';
// import Footer from './Components/Common/Footer';

// // Import Pages

// import HomePage from './Components/Pages/HomePage';
// import LoginPage from './Components/Pages/LoginPage';
// import RegisterPage from './Components/Pages/RegisterPage';
// import DashboardPage from './Components/Pages/DashboardPage';
// import LibraryPage from './Components/Pages/LibraryPage';
// import MarketplacePage from './Components/Pages/MarketplacePage';
// import ExchangePage from './Components/Pages/ExchangePage';
// import CommunityPage from './Components/Pages/CommunityPage';
// import ProfilePage from './Components/Pages/ProfilePage';
// import GamificationPage from './Components/Pages/GamificationPage';
// import BadgesPage from './Components/Pages/BadgesPage';
// import KoinsPage from './Components/Pages/KoinsPage';
// import TriviaPage from './Components/Pages/TriviaPage';
// import GuessPage from './Components/Pages/GuessPage';
// import StreakPage from './Components/Pages/StreakPage';
// import ScratchPage from './Components/Pages/ScratchPage';
// import ProgressPage from './Components/Pages/ProgressPage';
// function App() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <main className="main-content">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
          
//           {/* Protected Routes */}
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/library" element={<LibraryPage />} />
//           <Route path="/marketplace" element={<MarketplacePage />} />
//           <Route path="/exchange" element={<ExchangePage />} />
//           <Route path="/community" element={<CommunityPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
          
//           {/* Gamification Routes */}
//           {/* <Route path="/gamification" element={<GamificationPage />} />
//           <Route path="/gamification/badges" element={<GamificationPage />} />
//           <Route path="/gamification/koins" element={<GamificationPage />} />
//           <Route path="/gamification/trivia" element={<GamificationPage />} />
//           <Route path="/gamification/guess" element={<GamificationPage />} />
//            */}
//            <Route path="/gamification/badges" element={<BadgesPage />} />
// <Route path="/gamification/koins" element={<KoinsPage />} />
// <Route path="/gamification/trivia" element={<TriviaPage />} />
// <Route path="/gamification/guess" element={<GuessPage />} />
// <Route path="/gamification/streak" element={<StreakPage />} />
// <Route path="/gamification/scratch" element={<ScratchPage />} />
// <Route path="/gamification/progress" element={<ProgressPage />} />
//           {/* 404 - Catch all */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;

// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import './App.css';

// // import Navbar from './Components/Common/Navbar';
// // import Footer from './Components/Common/Footer';

// // import HomePage from './Components/Pages/HomePage';
// // import LoginPage from './Components/Pages/LoginPage';
// // import RegisterPage from './Components/Pages/RegisterPage';
// // import DashboardPage from './Components/Pages/DashboardPage';
// // import LibraryPage from './Components/Pages/LibraryPage';
// // import MarketplacePage from './Components/Pages/MarketplacePage';
// // import ExchangePage from './Components/Pages/ExchangePage';
// // import CommunityPage from './Components/Pages/CommunityPage';
// // import ProfilePage from './Components/Pages/ProfilePage';

// // function App() {
// //   return (
// //     <div className="app-container">
// //       <Navbar />
// //       <main className="main-content">
// //         <Routes>  {/* ← Routes only, NO BrowserRouter */}
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/login" element={<LoginPage />} />
// //           <Route path="/register" element={<RegisterPage />} />
// //           <Route path="/dashboard" element={<DashboardPage />} />
// //           <Route path="/library" element={<LibraryPage />} />
// //           <Route path="/marketplace" element={<MarketplacePage />} />
// //           <Route path="/exchange" element={<ExchangePage />} />
// //           <Route path="/community" element={<CommunityPage />} />
// //           <Route path="/profile" element={<ProfilePage />} />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default App;