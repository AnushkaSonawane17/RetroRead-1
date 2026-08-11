import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, BookOpen, Library, FileText, RefreshCw, PenLine, Brain, Flame } from 'lucide-react';

const progressData = [
  { title: 'Reading Progress', current: 150, total: 500, icon: BookOpen, color: '#D8472F' },
  { title: 'Books Completed', current: 3, total: 12, icon: Library, color: '#6B8F55' },
  { title: 'Pages Read', current: 450, total: 1000, icon: FileText, color: '#5C7A93' },
  { title: 'Book Exchange', current: 6, total: 10, icon: RefreshCw, color: '#3E7C74' },
  { title: 'Reviews Written', current: 3, total: 5, icon: PenLine, color: '#8B4C6D' },
  { title: 'Trivia Wins', current: 4, total: 10, icon: Brain, color: '#A9812F' },
];

const ProgressPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const stats = [
    { value: '72%', label: 'Overall Progress' },
    { value: '12', label: 'Books Read' },
    { value: '450', label: 'Pages Read' },
    { value: '7', label: 'Day Streak', flame: true },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes card-rise { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-rise { animation: card-rise 0.5s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        @keyframes flame-flicker { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.12) rotate(-4deg); } }
        .flame-flicker { animation: flame-flicker 1.8s ease-in-out infinite; }
        @keyframes float-y { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
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
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E2A42]/10 border border-[#1E2A42]/25">
                <BarChart3 size={18} className="text-[#1E2A42]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Progress Dashboard</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Track your reading achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="flex items-center justify-center gap-1.5">
                {s.flame && <Flame size={16} className="text-[#D8472F] flame-flicker" />}
                <div className="text-2xl font-display font-bold text-[#1E2A42]">{s.value}</div>
              </div>
              <div className="text-xs text-[#8A7F6B] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progressData.map((item, i) => {
            const pct = Math.round((item.current / item.total) * 100);
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${360 + i * 90}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full float-y" style={{ backgroundColor: item.color + '1A', border: `1px solid ${item.color}55` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#1E2A42]">{item.title}</h3>
                    <p className="text-[#8A7F6B] text-sm">{item.current} / {item.total}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-[#EDE2CE] rounded-full overflow-hidden border border-[#E2D5BC]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: mounted ? `${pct}%` : '0%', backgroundColor: item.color }}
                    />
                  </div>
                  <div className="absolute -top-6 right-0 text-sm font-display font-bold" style={{ color: item.color }}>{pct}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;









// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProgressPage = () => {
//   const navigate = useNavigate();

//   const progressData = [
//     { title: 'Reading Progress', current: 150, total: 500, icon: '📖', color: 'from-[#D4A017] to-[#8B6914]' },
//     { title: 'Books Completed', current: 3, total: 12, icon: '📚', color: 'from-emerald-500 to-green-500' },
//     { title: 'Pages Read', current: 450, total: 1000, icon: '📄', color: 'from-blue-500 to-purple-500' },
//     { title: 'Book Exchange', current: 6, total: 10, icon: '🔄', color: 'from-orange-500 to-red-500' },
//     { title: 'Reviews Written', current: 3, total: 5, icon: '✍️', color: 'from-pink-500 to-rose-500' },
//     { title: 'Trivia Wins', current: 4, total: 10, icon: '🧠', color: 'from-purple-500 to-indigo-500' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">← Back</button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">📊 Progress Dashboard</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Track your reading achievements</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { value: '72%', label: 'Overall Progress', color: 'text-[#D4A017] animate-pulse-slow' },
//             { value: '12', label: 'Books Read', color: 'text-emerald-400' },
//             { value: '450', label: 'Pages Read', color: 'text-[#D4A017]' },
//             { value: '7', label: 'Day Streak', color: 'text-[#D4A017]' },
//           ].map((stat, i) => (
//             <div key={i} className={`bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border ${i === 3 ? 'border-[#D4A017]/30 shadow-lg' : 'border-[#D4A017]/20'} shadow-lg`}>
//               <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
//               <div className="text-xs text-[#D4A017]/50">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Progress Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {progressData.map((item, index) => (
//             <div key={index} className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="text-2xl animate-float">{item.icon}</span>
//                 <div>
//                   <h3 className="font-bold text-[#f5ede4]">{item.title}</h3>
//                   <p className="text-[#D4A017]/50 text-sm">{item.current} / {item.total}</p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="w-full h-3 bg-[#1a0f0a]/80 rounded-full overflow-hidden border border-[#D4A017]/10">
//                   <div className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${(item.current / item.total) * 100}%` }} />
//                 </div>
//                 <div className="absolute -top-5 right-0 text-sm font-bold text-[#D4A017]">{Math.round((item.current / item.total) * 100)}%</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;












// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProgressPage = () => {
//   const navigate = useNavigate();

//   const progressData = [
//     { title: 'Reading Progress', current: 150, total: 500, icon: '📖', color: 'from-[#D4A017] to-[#8B6914]' },
//     { title: 'Books Completed', current: 3, total: 12, icon: '📚', color: 'from-emerald-500 to-green-500' },
//     { title: 'Pages Read', current: 450, total: 1000, icon: '📄', color: 'from-blue-500 to-purple-500' },
//     { title: 'Book Exchange', current: 6, total: 10, icon: '🔄', color: 'from-orange-500 to-red-500' },
//     { title: 'Reviews Written', current: 3, total: 5, icon: '✍️', color: 'from-pink-500 to-rose-500' },
//     { title: 'Trivia Wins', current: 4, total: 10, icon: '🧠', color: 'from-purple-500 to-indigo-500' },
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
//               <h1 className="text-3xl font-bold text-[#D4A017]">📊 Progress Dashboard</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Track your reading achievements</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">72%</div>
//             <div className="text-xs text-[#D4A017]/50">Overall Progress</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-emerald-400">12</div>
//             <div className="text-xs text-[#D4A017]/50">Books Read</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">450</div>
//             <div className="text-xs text-[#D4A017]/50">Pages Read</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">7</div>
//             <div className="text-xs text-[#D4A017]/50">Day Streak</div>
//           </div>
//         </div>

//         {/* Progress Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {progressData.map((item, index) => (
//             <div key={index} className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="text-2xl">{item.icon}</span>
//                 <div>
//                   <h3 className="font-bold text-[#f5ede4]">{item.title}</h3>
//                   <p className="text-[#D4A017]/50 text-sm">{item.current} / {item.total}</p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="w-full h-3 bg-[#1a0f0a]/80 rounded-full overflow-hidden border border-[#D4A017]/10">
//                   <div 
//                     className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
//                     style={{ width: `${(item.current / item.total) * 100}%` }}
//                   />
//                 </div>
//                 <div className="absolute -top-5 right-0 text-sm font-bold text-[#D4A017]">
//                   {Math.round((item.current / item.total) * 100)}%
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;