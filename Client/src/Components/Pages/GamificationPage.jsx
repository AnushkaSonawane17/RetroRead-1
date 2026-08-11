import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Award, Coins, Brain, Target, Flame, Sparkles, BarChart3, Trophy, BookOpen } from 'lucide-react';

const features = [
  { name: 'Badges', desc: 'Collect all badges', path: '/gamification/badges', icon: Award, color: '#A9812F' },
  { name: 'KOINS', desc: 'Earn and redeem', path: '/gamification/koins', icon: Coins, color: '#6B8F55' },
  { name: 'Trivia', desc: 'Test your knowledge', path: '/gamification/trivia', icon: Brain, color: '#5C7A93' },
  { name: 'Guess', desc: 'Guess the book', path: '/gamification/guess', icon: Target, color: '#8B4C6D' },
  { name: 'Streak', desc: 'Keep reading daily', path: '/gamification/streak', icon: Flame, color: '#D8472F' },
  { name: 'Scratch', desc: 'Win prizes', path: '/gamification/scratch', icon: Sparkles, color: '#3E7C74' },
  { name: 'Progress', desc: 'Track achievements', path: '/gamification/progress', icon: BarChart3, color: '#1E2A42' },
];

function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

const GamificationPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const koins = useCountUp(2450, 1200);

  useEffect(() => { setMounted(true); }, []);

  const stats = [
    { value: koins, label: 'KOINS' },
    { value: 8, label: 'Badges' },
    { value: 7, label: 'Day Streak', flame: true },
    { value: 12, label: 'Books Read' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes card-rise { 0% { opacity: 0; transform: translateY(16px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .card-rise { animation: card-rise 0.5s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        @keyframes flame-flicker { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.12) rotate(-4deg); } }
        .flame-flicker { animation: flame-flicker 1.8s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 7s linear infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div
          className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                <Gamepad2 size={18} className="text-[#D8472F] spin-slow" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Gamification Hub</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Earn KOINS, unlock badges, and compete with friends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-center gap-1.5">
                {s.flame && <Flame size={18} className="text-[#D8472F] flame-flicker" />}
                <div className="text-2xl font-display font-bold text-[#1E2A42] tabular-nums">{s.value}</div>
              </div>
              <div className="text-xs text-[#8A7F6B] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.name}
                onClick={() => navigate(f.path)}
                className="card-rise group bg-[#FFFBF3] p-6 rounded-2xl cursor-pointer border border-[#E2D5BC] hover:border-[#D9C7A3] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:shadow-[0_18px_30px_-16px_rgba(30,42,66,0.35)] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${360 + i * 80}ms` }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: f.color + '1A', border: `1px solid ${f.color}55` }}
                >
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-bold text-[#1E2A42] text-lg">{f.name}</h3>
                <p className="text-[#8A7F6B] text-sm">{f.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium group-hover:translate-x-1 transition-transform duration-300" style={{ color: f.color }}>
                  Explore →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamificationPage;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const GamificationPage = () => {
//   const navigate = useNavigate();

//   const features = [
//     { name: '🏅 Badges', desc: 'Collect all badges', path: '/gamification/badges', color: 'from-[#D4A017] to-[#FFD700]' },
//     { name: '⭐ KOINS', desc: 'Earn and redeem', path: '/gamification/koins', color: 'from-emerald-500 to-green-500' },
//     { name: '🧠 Trivia', desc: 'Test your knowledge', path: '/gamification/trivia', color: 'from-blue-500 to-purple-500' },
//     { name: '🎯 Guess', desc: 'Guess the book', path: '/gamification/guess', color: 'from-pink-500 to-rose-500' },
//     { name: '🔥 Streak', desc: 'Keep reading daily', path: '/gamification/streak', color: 'from-orange-500 to-red-500' },
//     { name: '🎰 Scratch', desc: 'Win prizes', path: '/gamification/scratch', color: 'from-purple-500 to-indigo-500' },
//     { name: '📊 Progress', desc: 'Track achievements', path: '/gamification/progress', color: 'from-cyan-500 to-blue-500' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300"
//             >
//               ← Back
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🎮 Gamification Hub</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Earn KOINS, unlock badges, and compete with friends</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Row */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/20 shadow-lg">
//             <div className="text-2xl font-bold text-[#D4A017] animate-pulse-slow">2,450</div>
//             <div className="text-xs text-[#D4A017]/50">⭐ KOINS</div>
//           </div>
//           <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/20 shadow-lg">
//             <div className="text-2xl font-bold text-emerald-400">8</div>
//             <div className="text-xs text-[#D4A017]/50">🏅 Badges</div>
//           </div>
//           <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/20 shadow-lg">
//             <div className="text-2xl font-bold text-[#D4A017]">7</div>
//             <div className="text-xs text-[#D4A017]/50">🔥 Day Streak</div>
//           </div>
//           <div className="bg-gradient-to-br from-[#D4A017]/20 to-[#8B6914]/20 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/30 shadow-lg">
//             <div className="text-2xl font-bold text-[#D4A017]">12</div>
//             <div className="text-xs text-[#D4A017]/50">📚 Books Read</div>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {features.map((feature) => (
//             <div
//               key={feature.name}
//               onClick={() => navigate(feature.path)}
//               className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg group`}
//             >
//               <div className="text-5xl mb-3 group-hover:animate-bounce-slow">{feature.name.split(' ')[0]}</div>
//               <h3 className="font-bold text-white text-lg">{feature.name}</h3>
//               <p className="text-white/70 text-sm">{feature.desc}</p>
//               <div className="mt-3 text-white/50 text-xs group-hover:translate-x-2 transition-transform duration-300">
//                 Click to explore →
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GamificationPage;



// // import React, { useState, useEffect } from 'react';
// import { useGamification } from '../Components/Gamification/GamificationContext';
// import GuessTheBook from '../Components/Gamification/GuessTheBook';
// import ScratchCard from '../Components/Gamification/ScratchCard';
// import './Gamification.css';

// const GamificationPage = () => {
//   const { koins, addKoins, badges, streak, scratchCards, resetScratchCards } = useGamification();
//   const [activeTab, setActiveTab] = useState('overview');

//   const unlockedCount = badges.filter(b => b.unlocked).length;
//   const totalBadges = badges.length;

//   useEffect(() => {
//     // Auto-increment streak
//     const interval = setInterval(() => {
//       // Update streak logic here
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="gamification-page">
//       <div className="gamification-header">
//         <h1>🏆 Gamification</h1>
//         <div className="koins-display">
//           <span className="koins-icon">🪙</span>
//           <span className="koins-count">{koins}</span>
//           <span className="koins-label">Koins</span>
//         </div>
//       </div>

//       <div className="gamification-tabs">
//         <button 
//           className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
//           onClick={() => setActiveTab('overview')}
//         >
//           📊 Overview
//         </button>
//         <button 
//           className={`tab ${activeTab === 'badges' ? 'active' : ''}`}
//           onClick={() => setActiveTab('badges')}
//         >
//           🏅 Badges
//         </button>
//         <button 
//           className={`tab ${activeTab === 'games' ? 'active' : ''}`}
//           onClick={() => setActiveTab('games')}
//         >
//           🎮 Games
//         </button>
//         <button 
//           className={`tab ${activeTab === 'scratch' ? 'active' : ''}`}
//           onClick={() => setActiveTab('scratch')}
//         >
//           🎰 Scratch Cards
//         </button>
//       </div>

//       <div className="gamification-content">
//         {activeTab === 'overview' && (
//           <div className="overview-grid">
//             <div className="stat-card">
//               <div className="stat-icon">🪙</div>
//               <div className="stat-info">
//                 <span className="stat-number">{koins}</span>
//                 <span className="stat-label">Total Koins</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">🏅</div>
//               <div className="stat-info">
//                 <span className="stat-number">{unlockedCount}/{totalBadges}</span>
//                 <span className="stat-label">Badges Unlocked</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">🔥</div>
//               <div className="stat-info">
//                 <span className="stat-number">{streak}</span>
//                 <span className="stat-label">Day Streak</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">📈</div>
//               <div className="stat-info">
//                 <span className="stat-number">{Math.round((unlockedCount/totalBadges) * 100)}%</span>
//                 <span className="stat-label">Completion</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'badges' && (
//           <div className="badges-grid">
//             {badges.map(badge => (
//               <div key={badge.id} className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
//                 <div className="badge-icon">{badge.icon}</div>
//                 <h4>{badge.name}</h4>
//                 <p>{badge.description}</p>
//                 {badge.unlocked ? (
//                   <span className="badge-status unlocked">✅ Unlocked • {badge.date}</span>
//                 ) : (
//                   <div className="badge-progress">
//                     <div className="progress-bar">
//                       <div className="progress-fill" style={{ width: `${badge.progress}%` }}></div>
//                     </div>
//                     <span className="badge-status locked">{badge.progress}%</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'games' && (
//           <div className="games-container">
//             <div className="game-card">
//               <GuessTheBook />
//             </div>
            
//             <div className="game-card trivia-card">
//               <h3>🧠 Book Trivia</h3>
//               <p>Coming soon! Answer questions about books.</p>
//               <button className="game-btn">Play Trivia</button>
//             </div>

//             <div className="game-card quiz-card">
//               <h3>📖 Book Quiz</h3>
//               <p>Test your book knowledge!</p>
//               <button className="game-btn">Start Quiz</button>
//             </div>
//           </div>
//         )}

//         {activeTab === 'scratch' && (
//           <div className="scratch-container">
//             <div className="scratch-header">
//               <h3>🎰 Scratch Cards</h3>
//               <button className="reset-btn" onClick={resetScratchCards}>
//                 Reset Cards
//               </button>
//             </div>
//             <div className="scratch-grid">
//               {scratchCards.map(card => (
//                 <ScratchCard key={card.id} card={card} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GamificationPage;