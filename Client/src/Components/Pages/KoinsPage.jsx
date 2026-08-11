import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, Gift, Wallet, BookOpen, Flame, Brain, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';

const earnMethods = [
  { icon: BookOpen, label: 'Read Book', koins: '+50' },
  { icon: Flame, label: 'Streak', koins: '+15' },
  { icon: Brain, label: 'Trivia', koins: '+20' },
  { icon: Sparkles, label: 'Scratch Card', koins: '+100' },
];

const transactions = [
  { id: 1, type: 'Daily Bonus', amount: '+25', date: 'Today', icon: Gift },
  { id: 2, type: 'Book Completed', amount: '+50', date: 'Today', icon: BookOpen },
  { id: 3, type: 'Trivia Win', amount: '+20', date: 'Yesterday', icon: Brain },
  { id: 4, type: 'Streak Bonus', amount: '+15', date: 'Yesterday', icon: Flame },
  { id: 5, type: 'Scratch Card', amount: '+100', date: '2 days ago', icon: Sparkles },
  { id: 6, type: 'Book Exchange', amount: '+30', date: '3 days ago', icon: RefreshCw },
];

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(target);
  const prevTarget = React.useRef(target);
  useEffect(() => {
    const from = prevTarget.current;
    prevTarget.current = target;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(from + (target - from) * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return value;
}

const KoinsPage = () => {
  const navigate = useNavigate();
  const [koins, setKoins] = useState(2450);
  const [showBonus, setShowBonus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const displayKoins = useCountUp(koins);

  useEffect(() => { setMounted(true); }, []);

  const handleDailyBonus = () => {
    setKoins((k) => k + 25);
    setShowBonus(true);
    setTimeout(() => setShowBonus(false), 2400);
  };

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes float-y { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
        .float-y { animation: float-y 3.4s ease-in-out infinite; }
        @keyframes pop-badge { 0% { transform: scale(0) translateY(6px); opacity: 0; } 60% { transform: scale(1.15) translateY(-2px); opacity: 1; } 100% { transform: scale(1) translateY(0); } }
        .pop-badge { animation: pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .seal-btn { position: relative; overflow: hidden; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.8s ease forwards; }
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
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6B8F55]/10 border border-[#6B8F55]/30">
                <Coins size={18} className="text-[#6B8F55]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">My KOINS</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Earn KOINS by reading, playing games, and more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative bg-[#FFFBF3] rounded-2xl p-8 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 text-[#6B8F55]/10"><Coins size={140} /></div>
          <div className="relative z-10">
            <Coins size={44} className="mx-auto text-[#6B8F55] float-y" />
            <div className="text-5xl font-display font-bold text-[#1E2A42] mt-2 tabular-nums">{displayKoins.toLocaleString()}</div>
            <div className="text-[#8A7F6B] mt-1">Total KOINS</div>
            <div className="flex gap-4 justify-center mt-5">
              <button onClick={handleDailyBonus} className="seal-btn relative flex items-center gap-2 px-6 py-2.5 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition">
                <Gift size={15} /> Daily Bonus
                {showBonus && (
                  <span className="pop-badge absolute -top-3 -right-3 bg-[#6B8F55] text-[#FFFBF3] text-xs px-2.5 py-1 rounded-full shadow-md">
                    +25!
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
                <Wallet size={15} /> Redeem
              </button>
            </div>
          </div>
        </div>

        {/* How to Earn */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {earnMethods.map((item, i) => (
            <div
              key={item.label}
              className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:-translate-y-1 hover:shadow-[0_14px_24px_-16px_rgba(30,42,66,0.35)] transition-all duration-300"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <item.icon size={22} className="mx-auto text-[#A9812F] mb-1" />
              <div className="text-xs font-semibold text-[#1E2A42]">{item.label}</div>
              <div className="text-[10px] text-[#8A7F6B]">{item.koins} KOINS</div>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4">Recent Transactions</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-[#F6EFE3] rounded-xl p-3 flex items-center justify-between border border-[#E2D5BC] hover:border-[#D9C7A3] transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A9812F]/10 text-[#A9812F]">
                    <tx.icon size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-[#1E2A42] text-sm">{tx.type}</div>
                    <div className="text-xs text-[#8A7F6B]">{tx.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-display font-bold text-[#6B8F55]">
                  <ArrowUpRight size={14} /> {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoinsPage;










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const KoinsPage = () => {
//   const navigate = useNavigate();
//   const [koins, setKoins] = useState(2450);
//   const [showBonus, setShowBonus] = useState(false);
//   const [totalEarned, setTotalEarned] = useState(450);
//   const [dailyBonus] = useState(25);

//   const [transactions] = useState([
//     { id: 1, type: 'Daily Bonus', amount: '+25', date: 'Today', icon: '🎁' },
//     { id: 2, type: 'Book Completed', amount: '+50', date: 'Today', icon: '📚' },
//     { id: 3, type: 'Trivia Win', amount: '+20', date: 'Yesterday', icon: '🧠' },
//     { id: 4, type: 'Streak Bonus', amount: '+15', date: 'Yesterday', icon: '🔥' },
//     { id: 5, type: 'Scratch Card', amount: '+100', date: '2 days ago', icon: '🎰' },
//     { id: 6, type: 'Book Exchange', amount: '+30', date: '3 days ago', icon: '🔄' },
//   ]);

//   const handleDailyBonus = () => {
//     setKoins(koins + dailyBonus);
//     setTotalEarned(totalEarned + dailyBonus);
//     setShowBonus(true);
//     setTimeout(() => setShowBonus(false), 3000);
//   };

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
//               <h1 className="text-3xl font-bold text-[#D4A017]">⭐ My KOINS</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Earn KOINS by reading, playing games, and more</p>
//             </div>
//           </div>
//         </div>

//         {/* Balance Card */}
//         <div className="bg-gradient-to-br from-[#D4A017]/20 via-[#8B6914]/20 to-[#D4A017]/10 rounded-2xl p-8 border border-[#D4A017]/30 shadow-2xl mb-6 text-center relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A017]/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8B6914]/5 rounded-full blur-3xl" />
//           <div className="relative z-10">
//             <div className="text-6xl mb-2 animate-bounce-slow">💰</div>
//             <div className="text-5xl font-bold text-[#D4A017]">{koins.toLocaleString()}</div>
//             <div className="text-[#D4A017]/50 mt-1">Total KOINS</div>
//             <div className="flex gap-4 justify-center mt-4">
//               <button 
//                 onClick={handleDailyBonus}
//                 className="px-6 py-2.5 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-2xl hover:shadow-[#D4A017]/30 transition-all duration-300 transform hover:scale-105 relative"
//               >
//                 🎁 Daily Bonus
//                 {showBonus && (
//                   <span className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
//                     +{dailyBonus} KOINS!
//                   </span>
//                 )}
//               </button>
//               <button className="px-6 py-2.5 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">
//                 💰 Redeem
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* How to Earn */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           {[
//             { icon: '📖', label: 'Read Book', koins: '+50' },
//             { icon: '🔥', label: 'Streak', koins: '+15' },
//             { icon: '🧠', label: 'Trivia', koins: '+20' },
//             { icon: '🎰', label: 'Scratch Card', koins: '+100' },
//           ].map((item, i) => (
//             <div key={i} className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/20 shadow-lg hover:shadow-[#D4A017]/10 transition-all duration-300 transform hover:scale-105">
//               <div className="text-3xl mb-1">{item.icon}</div>
//               <div className="text-xs font-semibold text-[#f5ede4]">{item.label}</div>
//               <div className="text-[10px] text-[#D4A017]/50">{item.koins} KOINS</div>
//             </div>
//           ))}
//         </div>

//         {/* Transactions */}
//         <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📊 Recent Transactions</h3>
//           <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
//             {transactions.map((tx) => (
//               <div key={tx.id} className="bg-[#1a0f0a]/60 rounded-xl p-3 flex items-center justify-between border border-[#D4A017]/5 hover:border-[#D4A017]/20 transition-all duration-300">
//                 <div className="flex items-center gap-3">
//                   <span className="text-2xl">{tx.icon}</span>
//                   <div>
//                     <div className="font-medium text-[#f5ede4] text-sm">{tx.type}</div>
//                     <div className="text-xs text-[#D4A017]/30">{tx.date}</div>
//                   </div>
//                 </div>
//                 <div className={`font-bold text-lg ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
//                   {tx.amount}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KoinsPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const KoinsPage = () => {
//   const navigate = useNavigate();
//   const [showBonus, setShowBonus] = useState(false);

//   const transactions = [
//     { id: 1, type: 'Daily Bonus', amount: '+25', date: 'Today', icon: '🎁' },
//     { id: 2, type: 'Book Completed', amount: '+50', date: 'Today', icon: '📚' },
//     { id: 3, type: 'Trivia Win', amount: '+20', date: 'Yesterday', icon: '🧠' },
//     { id: 4, type: 'Streak Bonus', amount: '+15', date: 'Yesterday', icon: '🔥' },
//     { id: 5, type: 'Scratch Card', amount: '+100', date: '2 days ago', icon: '🎰' },
//     { id: 6, type: 'Book Exchange', amount: '+30', date: '3 days ago', icon: '🔄' },
//   ];

//   const handleDailyBonus = () => {
//     setShowBonus(true);
//     setTimeout(() => setShowBonus(false), 3000);
//   };

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
//               <h1 className="text-3xl font-bold text-[#D4A017]">⭐ My KOINS</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Earn KOINS by reading, playing games, and more</p>
//             </div>
//           </div>
//         </div>

//         {/* Balance Card */}
//         <div className="bg-gradient-to-br from-[#D4A017]/20 to-[#8B6914]/20 rounded-2xl p-8 border border-[#D4A017]/30 shadow-2xl mb-6 text-center">
//           <div className="text-6xl mb-2">💰</div>
//           <div className="text-5xl font-bold text-[#D4A017]">2,450</div>
//           <div className="text-[#D4A017]/50 mt-1">Total KOINS</div>
//           <div className="flex gap-4 justify-center mt-4">
//             <button 
//               onClick={handleDailyBonus}
//               className="px-6 py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition relative"
//             >
//               🎁 Daily Bonus
//               {showBonus && (
//                 <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
//                   +25 KOINS!
//                 </span>
//               )}
//             </button>
//             <button className="px-6 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition">
//               💰 Redeem
//             </button>
//           </div>
//         </div>

//         {/* How to Earn */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl mb-1">📖</div>
//             <div className="text-xs font-semibold text-[#f5ede4]">Read Book</div>
//             <div className="text-[10px] text-[#D4A017]/50">+50 KOINS</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl mb-1">🔥</div>
//             <div className="text-xs font-semibold text-[#f5ede4]">Streak</div>
//             <div className="text-[10px] text-[#D4A017]/50">+15 KOINS</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl mb-1">🧠</div>
//             <div className="text-xs font-semibold text-[#f5ede4]">Trivia</div>
//             <div className="text-[10px] text-[#D4A017]/50">+20 KOINS</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl mb-1">🎰</div>
//             <div className="text-xs font-semibold text-[#f5ede4]">Scratch Card</div>
//             <div className="text-[10px] text-[#D4A017]/50">+100 KOINS</div>
//           </div>
//         </div>

//         {/* Transactions */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
//           <h3 className="font-bold text-[#f5ede4] mb-4">📊 Recent Transactions</h3>
//           <div className="space-y-3">
//             {transactions.map((tx) => (
//               <div key={tx.id} className="bg-[#1a0f0a]/80 rounded-xl p-3 flex items-center justify-between border border-[#D4A017]/5 hover:border-[#D4A017]/20 transition">
//                 <div className="flex items-center gap-3">
//                   <span className="text-2xl">{tx.icon}</span>
//                   <div>
//                     <div className="font-medium text-[#f5ede4] text-sm">{tx.type}</div>
//                     <div className="text-xs text-[#D4A017]/30">{tx.date}</div>
//                   </div>
//                 </div>
//                 <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
//                   {tx.amount}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KoinsPage;