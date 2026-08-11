import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Award, BookOpen, Bug, Flame, Library, PenLine, RefreshCw, Brain, Target,
  CheckCircle2, Lock, Trophy,
} from 'lucide-react';

const badgeIcon = {
  1: BookOpen, 2: Bug, 3: Flame, 4: Library, 5: PenLine, 6: RefreshCw, 7: Brain, 8: Target,
};

const badges = [
  { id: 1, name: 'First Reader', description: 'Read your first book', unlocked: true, date: 'Jan 2024' },
  { id: 2, name: 'Bookworm', description: 'Read 10 books', unlocked: true, date: 'Feb 2024' },
  { id: 3, name: 'Streak Master', description: '7-day reading streak', unlocked: true, date: 'Mar 2024' },
  { id: 4, name: 'Book Collector', description: 'Own 20 books', unlocked: false, progress: 15, total: 20 },
  { id: 5, name: 'Reviewer Pro', description: 'Write 5 reviews', unlocked: false, progress: 3, total: 5 },
  { id: 6, name: 'Exchange Expert', description: 'Complete 10 exchanges', unlocked: false, progress: 6, total: 10 },
  { id: 7, name: 'Trivia Champion', description: 'Win 5 trivia games', unlocked: true, date: 'Apr 2024' },
  { id: 8, name: 'Guess Master', description: 'Guess 10 books correctly', unlocked: false, progress: 7, total: 10 },
];

const BadgesPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;
  const completion = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes badge-in { 0% { opacity: 0; transform: scale(0.7) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        .badge-in { animation: badge-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
        @keyframes float-y { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .float-y { animation: float-y 3s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
              <ArrowLeft size={14} /> Back
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
                <Award size={18} className="text-[#A9812F]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">My Badges</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Collect all badges by completing achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-3xl font-display font-bold text-[#6B8F55]">{unlockedCount}</div>
            <div className="text-xs text-[#8A7F6B]">Unlocked</div>
          </div>
          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-3xl font-display font-bold text-[#8A7F6B]">{totalCount - unlockedCount}</div>
            <div className="text-xs text-[#8A7F6B]">Locked</div>
          </div>
          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-3xl font-display font-bold text-[#A9812F]">{completion}%</div>
            <div className="text-xs text-[#8A7F6B]">Completion</div>
          </div>
          <div className="bg-[#A9812F]/[0.08] rounded-xl p-4 text-center border border-[#A9812F]/25 shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] flex flex-col items-center justify-center">
            <Trophy size={26} className="text-[#A9812F] float-y" />
            <div className="text-xs text-[#8A7F6B] mt-1">Keep Going!</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge, i) => {
            const Icon = badgeIcon[badge.id];
            return (
              <div
                key={badge.id}
                className={`badge-in rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                  badge.unlocked
                    ? 'bg-[#A9812F]/[0.07] border-2 border-[#A9812F]/30 hover:shadow-[0_16px_28px_-16px_rgba(169,129,47,0.4)] cursor-pointer'
                    : 'bg-[#FFFBF3] border-2 border-[#E2D5BC] opacity-70'
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className={`flex h-14 w-14 mx-auto items-center justify-center rounded-full mb-3 ${badge.unlocked ? 'bg-[#A9812F]/15 text-[#A9812F]' : 'bg-[#EDE2CE] text-[#8A7F6B]'}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-[#1E2A42] text-base">{badge.name}</h3>
                <p className="text-sm text-[#8A7F6B] mt-1">{badge.description}</p>
                {badge.unlocked ? (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 text-xs text-[#6B8F55] bg-[#6B8F55]/10 px-3 py-1 rounded-full border border-[#6B8F55]/25">
                      <CheckCircle2 size={12} /> Unlocked · {badge.date}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="w-full h-2 bg-[#EDE2CE] rounded-full mb-2 overflow-hidden">
                      <div
                        className="h-full bg-[#A9812F] rounded-full transition-all duration-1000"
                        style={{ width: mounted ? `${(badge.progress / badge.total) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-[#8A7F6B]">
                      <Lock size={11} /> {badge.progress}/{badge.total}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const BadgesPage = () => {
//   const navigate = useNavigate();

//   const badges = [
//     { id: 1, name: 'First Reader', icon: '📖', description: 'Read your first book', unlocked: true, date: 'Jan 2024' },
//     { id: 2, name: 'Bookworm', icon: '🐛', description: 'Read 10 books', unlocked: true, date: 'Feb 2024' },
//     { id: 3, name: 'Streak Master', icon: '🔥', description: '7-day reading streak', unlocked: true, date: 'Mar 2024' },
//     { id: 4, name: 'Book Collector', icon: '📚', description: 'Own 20 books', unlocked: false, progress: 15 },
//     { id: 5, name: 'Reviewer Pro', icon: '✍️', description: 'Write 5 reviews', unlocked: false, progress: 3 },
//     { id: 6, name: 'Exchange Expert', icon: '🔄', description: 'Complete 10 exchanges', unlocked: false, progress: 6 },
//     { id: 7, name: 'Trivia Champion', icon: '🧠', description: 'Win 5 trivia games', unlocked: true, date: 'Apr 2024' },
//     { id: 8, name: 'Guess Master', icon: '🎯', description: 'Guess 10 books correctly', unlocked: false, progress: 7 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition"
//             >
//               ← Back
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🏅 My Badges</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Collect all badges by completing achievements</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">{badges.filter(b => b.unlocked).length}</div>
//             <div className="text-xs text-[#D4A017]/50">Unlocked</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]/30">{badges.filter(b => !b.unlocked).length}</div>
//             <div className="text-xs text-[#D4A017]/50">Locked</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">{Math.round((badges.filter(b => b.unlocked).length / badges.length) * 100)}%</div>
//             <div className="text-xs text-[#D4A017]/50">Completion</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">🏆</div>
//             <div className="text-xs text-[#D4A017]/50">Keep Going!</div>
//           </div>
//         </div>

//         {/* Badges Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {badges.map((badge) => (
//             <div
//               key={badge.id}
//               className={`
//                 rounded-2xl p-6 text-center transition-all duration-300
//                 ${badge.unlocked 
//                   ? 'bg-gradient-to-br from-[#D4A017]/20 to-[#8B6914]/10 border-2 border-[#D4A017]/30 hover:scale-105 hover:shadow-xl hover:shadow-[#D4A017]/20 cursor-pointer' 
//                   : 'bg-[#1a0f0a]/60 border-2 border-[#D4A017]/5 opacity-60'
//                 }
//               `}
//             >
//               <div className={`text-5xl mb-3 ${badge.unlocked ? 'animate-bounce-slow' : ''}`}>
//                 {badge.icon}
//               </div>
//               <h3 className="font-bold text-[#f5ede4] text-lg">{badge.name}</h3>
//               <p className="text-sm text-[#D4A017]/50 mt-1">{badge.description}</p>
//               {badge.unlocked ? (
//                 <div className="mt-3">
//                   <span className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">✅ Unlocked • {badge.date}</span>
//                 </div>
//               ) : (
//                 <div className="mt-3">
//                   <div className="w-full h-1.5 bg-[#1a0f0a]/80 rounded-full mb-2">
//                     <div 
//                       className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-500"
//                       style={{ width: `${(badge.progress / 10) * 100}%` }}
//                     />
//                   </div>
//                   <span className="text-xs text-[#D4A017]/30">🔒 {badge.progress}/10</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BadgesPage;