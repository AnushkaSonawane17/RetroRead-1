// import React, { useEffect, useState } from 'react';
// import { Coins, Flame, Trophy, Award, BookOpen, Target, Star } from 'lucide-react';

// const user = { name: 'John Doe', email: 'john@example.com', koins: 250, streak: 7, level: 3 };

// const badges = [
//   { id: 1, label: 'First Chapter', icon: BookOpen, earned: true },
//   { id: 2, label: '7-Day Streak', icon: Flame, earned: true },
//   { id: 3, label: 'Club Joiner', icon: Trophy, earned: true },
//   { id: 4, label: 'Marathon Reader', icon: Target, earned: false },
//   { id: 5, label: 'Top Rated', icon: Star, earned: false },
//   { id: 6, label: 'Bookworm Elite', icon: Award, earned: false },
// ];

// function useCountUp(target, duration = 1000) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     let start = null;
//     const step = (ts) => {
//       if (!start) start = ts;
//       const progress = Math.min((ts - start) / duration, 1);
//       setValue(Math.floor(progress * target));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [target, duration]);
//   return value;
// }

// function MiniReadingBook() {
//   return (
//     <div className="relative w-14 h-9" style={{ perspective: '600px' }}>
//       <div className="absolute inset-0 flex rounded overflow-hidden shadow-sm">
//         <div className="w-1/2 bg-[#F6EFE3] border-r border-[#1E2A42]/10" />
//         <div className="w-1/2 bg-[#F6EFE3]" />
//       </div>
//       {[0, 1].map((i) => (
//         <div
//           key={i}
//           className="mini-page"
//           style={{ animation: `mini-flip 3s ease-in-out ${i * 1.4}s infinite`, zIndex: 2 - i }}
//         />
//       ))}
//     </div>
//   );
// }

// const ProfilePage = () => {
//   const [mounted, setMounted] = useState(false);
//   const koinCount = useCountUp(user.koins, 1200);

//   useEffect(() => { setMounted(true); }, []);

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }

//         @keyframes badge-in {
//           0% { opacity: 0; transform: scale(0.7) translateY(10px); }
//           100% { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .badge-in { animation: badge-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }

//         @keyframes flame-flicker {
//           0%, 100% { transform: scale(1) rotate(0deg); }
//           50% { transform: scale(1.12) rotate(-4deg); }
//         }
//         .flame-flicker { animation: flame-flicker 1.8s ease-in-out infinite; }

//         @keyframes ring-progress { from { stroke-dashoffset: 226; } }
//         .ring-progress { animation: ring-progress 1.2s ease-out forwards; }

//         .mini-page {
//           position: absolute; top: 0; right: 0; width: 50%; height: 100%;
//           background: #F6EFE3; border-left: 1px solid rgba(30,42,66,0.12);
//           transform-origin: left center; backface-visibility: hidden;
//           border-radius: 0 3px 3px 0;
//         }
//         @keyframes mini-flip {
//           0% { transform: rotateY(0deg); }
//           50% { transform: rotateY(-172deg); }
//           100% { transform: rotateY(0deg); }
//         }
//       `}</style>

//       <div className="font-body relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">

//         {/* ===== Header ===== */}
//         <div
//           className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${
//             mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <div className="flex items-center justify-between mb-5">
//             <h1 className="font-display font-bold text-3xl text-[#1E2A42]">My Profile</h1>
//             <MiniReadingBook />
//           </div>
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <div className="w-20 h-20 rounded-full bg-[#D8472F] flex items-center justify-center text-[#FFFBF3] text-2xl font-display font-bold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.5)]">
//                 JD
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#A9812F] border-2 border-[#FFFBF3] flex items-center justify-center text-[10px] font-bold text-[#FFFBF3]">
//                 {user.level}
//               </div>
//             </div>
//             <div>
//               <h2 className="font-display text-xl font-bold text-[#1E2A42]">{user.name}</h2>
//               <p className="text-[#8A7F6B] text-sm">{user.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* ===== Koin / Streak / Level ===== */}
//         <div
//           className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${
//             mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
//               <Coins size={20} className="text-[#A9812F]" />
//             </div>
//             <div>
//               <p className="font-display text-2xl font-bold text-[#1E2A42] tabular-nums">{koinCount}</p>
//               <p className="text-xs text-[#8A7F6B]">Koins earned</p>
//             </div>
//           </div>

//           <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
//               <Flame size={20} className="text-[#D8472F] flame-flicker" />
//             </div>
//             <div>
//               <p className="font-display text-2xl font-bold text-[#1E2A42]">{user.streak} days</p>
//               <p className="text-xs text-[#8A7F6B]">Current streak</p>
//             </div>
//           </div>

//           <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] flex items-center gap-4">
//             <div className="relative h-12 w-12 shrink-0">
//               <svg className="h-12 w-12 -rotate-90" viewBox="0 0 80 80">
//                 <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
//                 <circle
//                   cx="40" cy="40" r="34" fill="none" stroke="#1E2A42" strokeWidth="8" strokeLinecap="round"
//                   strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - 0.45)}
//                   className="ring-progress"
//                 />
//               </svg>
//               <span className="absolute inset-0 flex items-center justify-center font-display text-xs font-bold text-[#1E2A42]">
//                 Lv{user.level}
//               </span>
//             </div>
//             <div>
//               <p className="font-display text-base font-bold text-[#1E2A42]">Level {user.level}</p>
//               <p className="text-xs text-[#8A7F6B]">45% to next level</p>
//             </div>
//           </div>
//         </div>

//         {/* ===== Badges ===== */}
//         <div
//           className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 delay-200 ${
//             mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <h2 className="font-display font-semibold text-lg text-[#1E2A42] mb-5">Badges</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {badges.map((b, i) => {
//               const Icon = b.icon;
//               return (
//                 <div
//                   key={b.id}
//                   className={`badge-in flex flex-col items-center text-center gap-2 rounded-xl p-4 border ${
//                     b.earned ? 'border-[#A9812F]/40 bg-[#A9812F]/[0.06]' : 'border-[#E2D5BC] bg-[#F6EFE3] opacity-50'
//                   }`}
//                   style={{ animationDelay: `${300 + i * 90}ms` }}
//                 >
//                   <div
//                     className={`flex h-12 w-12 items-center justify-center rounded-full ${
//                       b.earned ? 'bg-[#A9812F]/15 text-[#A9812F]' : 'bg-[#E2D5BC]/60 text-[#8A7F6B]'
//                     }`}
//                   >
//                     <Icon size={20} />
//                   </div>
//                   <p className="text-xs font-medium text-[#1E2A42]">{b.label}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;






import React, { useEffect, useState } from 'react';
import {
  Coins, Flame, BookOpen, Layers, Pencil, Star, Award, ChevronRight,
  Heart, MessageSquare, Bookmark, Settings, Activity, MapPin, Crown,
} from 'lucide-react';

const user = {
  name: 'Archie', handle: '@archie_reader', email: 'archie@example.com',
  location: 'Pune, Maharashtra, India', koins: 2450, streak: 15, readingStreak: 24, booksRead: 48,
};

const currentBook = { title: 'Atomic Habits', author: 'James Clear', current: 204, total: 300 };
const weekDays = [
  { d: 'M', read: true }, { d: 'T', read: true }, { d: 'W', read: true }, { d: 'T', read: true },
  { d: 'F', read: true }, { d: 'S', read: false }, { d: 'S', read: false },
];

const badges = [
  { icon: Award, color: '#A9812F' },
  { icon: BookOpen, color: '#6B8F55' },
  { icon: Flame, color: '#D8472F' },
  { icon: Star, color: '#5C7A93' },
];

const genres = [
  { name: 'Fiction', count: 12, color: '#D8472F', icon: BookOpen },
  { name: 'Self-Help', count: 9, color: '#A9812F', icon: Layers },
  { name: 'Motivation', count: 6, color: '#6B8F55', icon: Flame },
  { name: 'Science', count: 5, color: '#5C7A93', icon: Activity },
  { name: 'History', count: 4, color: '#8B4C6D', icon: Bookmark },
];

const accountStats = [
  { label: 'Books Read', value: 48 },
  { label: 'Hours Read', value: 120 },
  { label: 'Reviews', value: 12 },
  { label: 'Wishlist', value: 32 },
];

const tabs = ['Overview', 'Reading Activity', 'Reviews', 'Wishlist', 'Settings'];

function useCountUp(target, duration = 1100) {
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

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mounted, setMounted] = useState(false);
  const koinCount = useCountUp(user.koins, 1200);
  const pct = Math.round((currentBook.current / currentBook.total) * 100);

  useEffect(() => { setMounted(true); }, []);

  const quickStats = [
    { icon: Coins, value: koinCount.toLocaleString(), label: 'Koins', color: '#A9812F' },
    { icon: Flame, value: user.streak, label: 'Reading Streak', color: '#D8472F', flame: true },
    { icon: BookOpen, value: user.booksRead, label: 'Books Read', color: '#6B8F55' },
    { icon: Layers, value: user.readingStreak, label: 'Day Streak', color: '#5C7A93' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }

        @keyframes card-rise { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-rise { animation: card-rise 0.5s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }

        @keyframes flame-flicker { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.12) rotate(-4deg); } }
        .flame-flicker { animation: flame-flicker 1.8s ease-in-out infinite; }

        @keyframes badge-in { 0% { opacity: 0; transform: scale(0.6) translateY(8px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        .badge-in { animation: badge-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }

        @keyframes ring-progress { from { stroke-dashoffset: 226; } }
        .ring-progress { animation: ring-progress 1.2s ease-out forwards; }

        @keyframes day-in { 0% { opacity: 0; transform: scale(0.6); } 100% { opacity: 1; transform: scale(1); } }
        .day-in { animation: day-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-6">

        {/* ===== Page Header ===== */}
        <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-display font-bold text-3xl text-[#1E2A42]">My Profile</h1>
          <p className="text-[#8A7F6B] text-sm mt-1">Manage your account and reading preferences</p>
        </div>

        {/* ===== Profile Card ===== */}
        <div className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#D8472F] flex items-center justify-center text-[#FFFBF3] text-2xl font-display font-bold shrink-0 shadow-[0_10px_20px_-10px_rgba(216,71,47,0.5)]">
                {user.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-[#1E2A42]">{user.name}</h2>
                  <span className="flex items-center gap-1 text-[10px] font-semibold bg-[#A9812F]/15 text-[#A9812F] px-2 py-0.5 rounded-full border border-[#A9812F]/30">
                    <Crown size={10} /> Premium
                  </span>
                </div>
                <p className="text-sm text-[#8A7F6B]">{user.handle}</p>
                <p className="text-sm text-[#8A7F6B]">{user.email}</p>
                <p className="flex items-center gap-1 text-xs text-[#8A7F6B] mt-1">
                  <MapPin size={11} /> {user.location}
                </p>
                <button className="flex items-center gap-1.5 mt-3 px-4 py-1.5 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-xs font-medium border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
                  <Pencil size={12} /> Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center gap-1 px-3 py-2 rounded-xl bg-[#F6EFE3] border border-[#E2D5BC] min-w-[86px]">
                  <s.icon size={17} style={{ color: s.color }} className={s.flame ? 'flame-flicker' : ''} />
                  <span className="font-display font-bold text-sm text-[#1E2A42]">{s.value}</span>
                  <span className="text-[10px] text-[#8A7F6B] leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex gap-6 overflow-x-auto border-b border-[#E2D5BC]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-[#D8472F]' : 'text-[#8A7F6B] hover:text-[#1E2A42]'
              }`}
            >
              {tab}
              {activeTab === tab && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#D8472F] rounded-full" />}
            </button>
          ))}
        </div>

        {activeTab !== 'Overview' ? (
          <div className="bg-[#FFFBF3] rounded-2xl p-12 text-center border border-[#E2D5BC]">
            <Settings size={26} className="mx-auto text-[#8A7F6B] mb-3" />
            <h3 className="font-display text-xl font-semibold text-[#1E2A42]">{activeTab}</h3>
            <p className="text-[#8A7F6B] text-sm mt-2">This section is coming soon.</p>
          </div>
        ) : (
          <>
            {/* ===== Reading Progress + Streak ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: '80ms' }}>
                <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4">Reading Progress</h3>
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 shrink-0">
                    <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
                      <circle
                        cx="40" cy="40" r="34" fill="none" stroke="#D8472F" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - currentBook.current / currentBook.total)}
                        className="ring-progress"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display text-base font-bold text-[#1E2A42]">{pct}%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1E2A42] truncate">{currentBook.title}</p>
                    <p className="text-sm text-[#8A7F6B]">{currentBook.author}</p>
                    <div className="w-full h-2 bg-[#EDE2CE] rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-[#D8472F] rounded-full transition-all duration-1000" style={{ width: mounted ? `${pct}%` : '0%' }} />
                    </div>
                    <p className="text-xs text-[#8A7F6B] mt-1">{currentBook.current} / {currentBook.total} pages</p>
                    <button className="mt-3 w-full py-2 bg-[#1E2A42] text-[#FFFBF3] rounded-full text-xs font-semibold hover:bg-[#16223A] transition">
                      Continue Reading
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: '160ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Flame size={18} className="text-[#D8472F] flame-flicker" />
                  <h3 className="font-display font-semibold text-lg text-[#1E2A42]">Current Streak · {user.streak} Days</h3>
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  {weekDays.map((d, i) => (
                    <div key={i} className="day-in flex flex-col items-center gap-1.5" style={{ animationDelay: `${240 + i * 70}ms` }}>
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                          d.read ? 'bg-[#D8472F] text-[#FFFBF3] shadow-[0_6px_12px_-6px_rgba(216,71,47,0.5)]' : 'bg-[#EDE2CE] text-[#8A7F6B] border border-[#E2D5BC]'
                        }`}
                      >
                        {d.read && <Flame size={13} />}
                      </div>
                      <span className="text-[10px] text-[#8A7F6B]">{d.d}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#8A7F6B] mt-4">Keep it up! Read today to extend your streak.</p>
              </div>
            </div>

            {/* ===== Recent Badges + Reading Genres ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg text-[#1E2A42] flex items-center gap-2">
                    <Award size={17} className="text-[#A9812F]" /> Recent Badges
                  </h3>
                  <button className="flex items-center gap-0.5 text-xs text-[#D8472F] font-medium hover:underline">
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                <div className="flex gap-4">
                  {badges.map((b, i) => (
                    <div
                      key={i}
                      className="badge-in flex h-14 w-14 items-center justify-center rounded-full"
                      style={{ backgroundColor: b.color + '15', border: `1px solid ${b.color}40`, animationDelay: `${260 + i * 90}ms` }}
                    >
                      <b.icon size={20} style={{ color: b.color }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: '280ms' }}>
                <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4">Reading Genres</h3>
                <div className="flex flex-wrap gap-2.5">
                  {genres.map((g) => (
                    <span
                      key={g.name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: g.color + '12', color: g.color, border: `1px solid ${g.color}35` }}
                    >
                      <g.icon size={12} /> {g.name} · {g.count} books
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== Account Stats ===== */}
            <div className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: '360ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-[#1E2A42]">Account Stats</h3>
                <button className="flex items-center gap-0.5 text-xs text-[#D8472F] font-medium hover:underline">
                  View detailed analytics <ChevronRight size={12} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {accountStats.map((s) => (
                  <div key={s.label} className="text-center py-3 rounded-xl bg-[#F6EFE3] border border-[#E2D5BC]">
                    <div className="font-display font-bold text-2xl text-[#1E2A42]">{s.value}</div>
                    <div className="text-xs text-[#8A7F6B] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;