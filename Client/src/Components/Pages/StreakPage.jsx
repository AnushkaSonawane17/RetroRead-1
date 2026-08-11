import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Trophy, Zap, Coins, CalendarDays, BookOpen, Plus, CheckCircle2 } from 'lucide-react';

const logs = [
  { date: 'Today', time: '2 hours', book: 'Atomic Habits', pages: 45 },
  { date: 'Yesterday', time: '1.5 hours', book: 'Ikigai', pages: 32 },
  { date: '2 days ago', time: '2 hours', book: 'Deep Work', pages: 50 },
  { date: '3 days ago', time: '1 hour', book: 'Sapiens', pages: 28 },
];

const StreakPage = () => {
  const navigate = useNavigate();
  const [streak] = useState(7);
  const [days, setDays] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekDays.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        read: i < streak,
        isToday: i === 6,
      });
    }
    setDays(weekDays);
  }, [streak]);

  const stats = [
    { value: streak, label: 'Day Streak', icon: Flame, flame: true },
    { value: '14 days', label: 'Best Streak', icon: Trophy },
    { value: `${30 - streak} days`, label: 'To Next Milestone', icon: Zap },
    { value: `${streak * 5}`, label: 'KOINS Earned', icon: Coins },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes flame-flicker { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.14) rotate(-4deg); } }
        .flame-flicker { animation: flame-flicker 1.7s ease-in-out infinite; }
        @keyframes day-in { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        .day-in { animation: day-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
        @keyframes pulse-ring { 0%,100% { box-shadow: 0 0 0 0 rgba(216,71,47,0.35); } 50% { box-shadow: 0 0 0 6px rgba(216,71,47,0); } }
        .pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
        @keyframes card-rise { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-rise { animation: card-rise 0.4s ease forwards; opacity: 0; }
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
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                <Flame size={18} className="text-[#D8472F] flame-flicker" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Reading Streak</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Keep reading daily to maintain your streak!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: `${i * 90}ms` }}>
              <s.icon size={22} className={`mx-auto mb-1 text-[#D8472F] ${s.flame ? 'flame-flicker' : ''}`} />
              <div className="text-xl font-display font-bold text-[#1E2A42]">{s.value}</div>
              <div className="text-xs text-[#8A7F6B]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4 flex items-center gap-2">
            <CalendarDays size={17} className="text-[#D8472F]" /> This Week
          </h3>
          <div className="grid grid-cols-7 gap-3">
            {days.map((day, i) => (
              <div key={i} className="day-in text-center" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="text-xs text-[#8A7F6B] mb-1">{day.day}</div>
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    day.read
                      ? `bg-[#D8472F] text-[#FFFBF3] shadow-[0_8px_16px_-8px_rgba(216,71,47,0.5)] ${day.isToday ? 'pulse-ring' : ''}`
                      : 'bg-[#EDE2CE] text-[#8A7F6B] border border-[#E2D5BC]'
                  }`}
                >
                  {day.dateNum}
                </div>
                <div className="text-[10px] text-[#8A7F6B] mt-1 flex items-center justify-center gap-0.5">
                  {day.read ? <><CheckCircle2 size={10} className="text-[#6B8F55]" /> Read</> : 'Missed'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Log */}
        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4 flex items-center gap-2">
            <BookOpen size={17} className="text-[#D8472F]" /> Recent Reading Log
          </h3>
          <div className="space-y-3">
            {logs.map((log, i) => (
              <div key={i} className="bg-[#F6EFE3] rounded-xl p-3 flex items-center justify-between border border-[#E2D5BC] hover:border-[#D9C7A3] transition">
                <div>
                  <div className="font-medium text-[#1E2A42] text-sm">{log.book}</div>
                  <div className="text-xs text-[#8A7F6B]">{log.date} · {log.pages} pages</div>
                </div>
                <div className="text-sm text-[#D8472F] font-medium">{log.time}</div>
              </div>
            ))}
          </div>
          <button className="seal-btn w-full mt-4 py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition flex items-center justify-center gap-2">
            <Plus size={15} /> Log Today's Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakPage;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StreakPage = () => {
//   const navigate = useNavigate();
//   const [streak] = useState(7);
//   const [days, setDays] = useState([]);
//   const [logs] = useState([
//     { date: 'Today', time: '2 hours', book: 'Atomic Habits', pages: 45 },
//     { date: 'Yesterday', time: '1.5 hours', book: 'Ikigai', pages: 32 },
//     { date: '2 days ago', time: '2 hours', book: 'Deep Work', pages: 50 },
//     { date: '3 days ago', time: '1 hour', book: 'Sapiens', pages: 28 },
//   ]);

//   useEffect(() => {
//     const today = new Date();
//     const weekDays = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
//       weekDays.push({
//         date: date,
//         day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//         dateNum: date.getDate(),
//         read: i < streak,
//         isToday: i === 6
//       });
//     }
//     setDays(weekDays);
//   }, [streak]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">← Back</button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🔥 Reading Streak</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Keep reading daily to maintain your streak!</p>
//             </div>
//           </div>
//         </div>

//         {/* Streak Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { value: streak, label: 'Day Streak', color: 'text-[#D4A017]' },
//             { value: '🔥', label: 'Best: 14 days', color: 'text-3xl' },
//             { value: '⚡', label: `Next: ${30 - streak} days`, color: 'text-emerald-400' },
//             { value: '⭐', label: `${streak * 5} KOINS Earned`, color: 'text-[#D4A017]' },
//           ].map((stat, i) => (
//             <div key={i} className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/20 shadow-lg hover:shadow-[#D4A017]/10 transition-all duration-300">
//               <div className={`text-3xl font-bold animate-pulse-slow ${stat.color}`}>{stat.value}</div>
//               <div className="text-xs text-[#D4A017]/50">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Calendar */}
//         <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📅 This Week</h3>
//           <div className="grid grid-cols-7 gap-3">
//             {days.map((day, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-xs text-[#D4A017]/50 mb-1">{day.day}</div>
//                 <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${day.read ? (day.isToday ? 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] shadow-lg shadow-[#D4A017]/30 ring-2 ring-[#D4A017]/50 animate-pulse' : 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] shadow-lg shadow-[#D4A017]/20') : 'bg-[#1a0f0a]/60 text-[#D4A017]/30 border border-[#D4A017]/10'}`}>
//                   {day.dateNum}
//                 </div>
//                 <div className="text-[10px] text-[#D4A017]/30 mt-1">{day.read ? '✅ Read' : '⬜ Missed'}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reading Log */}
//         <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📚 Recent Reading Log</h3>
//           <div className="space-y-3">
//             {logs.map((log, index) => (
//               <div key={index} className="bg-[#1a0f0a]/60 rounded-xl p-3 flex items-center justify-between border border-[#D4A017]/5 hover:border-[#D4A017]/20 transition-all duration-300">
//                 <div>
//                   <div className="font-medium text-[#f5ede4] text-sm">{log.book}</div>
//                   <div className="text-xs text-[#D4A017]/30">{log.date} • {log.pages} pages</div>
//                 </div>
//                 <div className="text-sm text-[#D4A017]">{log.time}</div>
//               </div>
//             ))}
//           </div>
//           <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-2xl hover:shadow-[#D4A017]/30 transition-all duration-300 transform hover:scale-[1.02]">+ Log Today's Reading</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StreakPage;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StreakPage = () => {
//   const navigate = useNavigate();
//   const [streak, setStreak] = useState(7);
//   const [days, setDays] = useState([]);
//   const [logs, setLogs] = useState([
//     { date: 'Today', time: '2 hours', book: 'Atomic Habits', pages: 45 },
//     { date: 'Yesterday', time: '1.5 hours', book: 'Ikigai', pages: 32 },
//     { date: '2 days ago', time: '2 hours', book: 'Deep Work', pages: 50 },
//     { date: '3 days ago', time: '1 hour', book: 'Sapiens', pages: 28 },
//   ]);

//   useEffect(() => {
//     const today = new Date();
//     const weekDays = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
//       weekDays.push({
//         date: date,
//         day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//         dateNum: date.getDate(),
//         read: i < streak
//       });
//     }
//     setDays(weekDays);
//   }, [streak]);

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
//               <h1 className="text-3xl font-bold text-[#D4A017]">🔥 Reading Streak</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Keep reading daily to maintain your streak!</p>
//             </div>
//           </div>
//         </div>

//         {/* Streak Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-3xl font-bold text-[#D4A017]">{streak}</div>
//             <div className="text-xs text-[#D4A017]/50">Day Streak</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-3xl font-bold text-[#f5ede4]">🔥</div>
//             <div className="text-xs text-[#D4A017]/50">Best Streak: 14 days</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-3xl font-bold text-emerald-400">⚡</div>
//             <div className="text-xs text-[#D4A017]/50">Next: {30 - streak} days to go</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-3xl font-bold text-[#D4A017]">⭐</div>
//             <div className="text-xs text-[#D4A017]/50">{streak * 5} KOINS Earned</div>
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl mb-6">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📅 This Week</h3>
//           <div className="grid grid-cols-7 gap-3">
//             {days.map((day, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-xs text-[#D4A017]/50 mb-1">{day.day}</div>
//                 <div className={`
//                   w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold
//                   ${day.read 
//                     ? 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] shadow-lg shadow-[#D4A017]/20' 
//                     : 'bg-[#1a0f0a]/60 text-[#D4A017]/30 border border-[#D4A017]/10'}
//                 `}>
//                   {day.dateNum}
//                 </div>
//                 <div className="text-[10px] text-[#D4A017]/30 mt-1">
//                   {day.read ? '✅ Read' : '⬜ Missed'}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reading Log */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📚 Recent Reading Log</h3>
//           <div className="space-y-3">
//             {logs.map((log, index) => (
//               <div key={index} className="bg-[#1a0f0a]/80 rounded-xl p-3 flex items-center justify-between border border-[#D4A017]/5 hover:border-[#D4A017]/20 transition">
//                 <div>
//                   <div className="font-medium text-[#f5ede4] text-sm">{log.book}</div>
//                   <div className="text-xs text-[#D4A017]/30">{log.date} • {log.pages} pages</div>
//                 </div>
//                 <div className="text-sm text-[#D4A017]">{log.time}</div>
//               </div>
//             ))}
//           </div>
//           <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition">
//             + Log Today's Reading
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StreakPage;