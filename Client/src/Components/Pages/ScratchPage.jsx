import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Gift, RefreshCw, CheckCircle2, PartyPopper, Trophy, Star, BookOpen } from 'lucide-react';

const prizes = [
  { icon: Star, prize: '20 KOINS', color: '#A9812F' },
  { icon: Sparkles, prize: '50 KOINS', color: '#5C7A93' },
  { icon: PartyPopper, prize: '100 KOINS', color: '#D8472F' },
  { icon: BookOpen, prize: 'Free Book', color: '#6B8F55' },
  { icon: Trophy, prize: '200 KOINS', color: '#8B4C6D' },
  { icon: Gift, prize: '25 KOINS', color: '#3E7C74' },
];

const ScratchPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [totalWon, setTotalWon] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCards([...prizes].sort(() => Math.random() - 0.5).map((p, i) => ({ id: i + 1, ...p, revealed: false })));
  }, []);

  const handleScratch = (id) => {
    setCards((cs) =>
      cs.map((card) => {
        if (card.id === id && !card.revealed) {
          const amount = parseInt(card.prize) || 0;
          setTotalWon((t) => t + amount);
          return { ...card, revealed: true };
        }
        return card;
      })
    );
  };

  const resetCards = () => {
    setCards([...prizes].sort(() => Math.random() - 0.5).map((p, i) => ({ id: i + 1, ...p, revealed: false })));
    setTotalWon(0);
  };

  if (cards.length === 0) {
    return <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center text-[#1E2A42] font-display text-2xl">Loading…</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes card-rise { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-rise { animation: card-rise 0.45s ease forwards; opacity: 0; }
        @keyframes gift-float { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-8px) rotate(4deg); } }
        .gift-float { animation: gift-float 2.6s ease-in-out infinite; }
        @keyframes prize-pop { 0% { opacity: 0; transform: scale(0.4) rotate(-8deg); } 60% { opacity: 1; transform: scale(1.12) rotate(2deg); } 100% { transform: scale(1) rotate(0deg); } }
        .prize-pop { animation: prize-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes shimmer-track { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        .shimmer-track { animation: shimmer-track 1.6s ease-in-out infinite; }
        .seal-btn { position: relative; overflow: hidden; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.8s ease forwards; }
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
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3E7C74]/10 border border-[#3E7C74]/30">
                <Sparkles size={18} className="text-[#3E7C74]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Scratch Cards</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Scratch to reveal your prize!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-2xl font-display font-bold text-[#1E2A42]">{cards.filter((c) => c.revealed).length}</div>
            <div className="text-xs text-[#8A7F6B]">Cards Scratched</div>
          </div>
          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-2xl font-display font-bold text-[#8A7F6B]">{cards.filter((c) => !c.revealed).length}</div>
            <div className="text-xs text-[#8A7F6B]">Cards Remaining</div>
          </div>
          <div className="bg-[#3E7C74]/[0.08] rounded-xl p-4 text-center border border-[#3E7C74]/30 shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]">
            <div className="text-2xl font-display font-bold text-[#3E7C74]">{totalWon}</div>
            <div className="text-xs text-[#8A7F6B]">Total KOINS Won</div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="card-rise bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)] transition-shadow duration-300"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div
                  onClick={() => handleScratch(card.id)}
                  className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: card.revealed ? `${card.color}12` : '#EDE2CE', border: `2px dashed ${card.revealed ? card.color + '55' : '#D9C7A3'}` }}
                >
                  {!card.revealed ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Gift size={54} className="text-[#8A7F6B] gift-float mb-2" />
                      <p className="text-[#8A7F6B] text-sm">Click to scratch!</p>
                      <div className="relative w-24 h-1.5 bg-[#E2D5BC] rounded-full mt-3 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-[#A9812F]/60 rounded-full shimmer-track" />
                      </div>
                    </div>
                  ) : (
                    <div className="prize-pop absolute inset-0 flex flex-col items-center justify-center">
                      <Icon size={48} style={{ color: card.color }} className="mb-2" />
                      <p className="text-2xl font-display font-bold" style={{ color: card.color }}>{card.prize}!</p>
                      <p className="text-[#8A7F6B] text-sm mt-1">Congratulations!</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleScratch(card.id)}
                    disabled={card.revealed}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      card.revealed ? 'bg-[#F6EFE3] text-[#8A7F6B] cursor-not-allowed border border-[#E2D5BC]' : 'seal-btn bg-[#D8472F] text-[#FFFBF3] hover:bg-[#B23522]'
                    }`}
                  >
                    {card.revealed ? <><CheckCircle2 size={14} /> Claimed</> : <><RefreshCw size={14} /> Scratch</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset */}
        <div className="text-center">
          <button onClick={resetCards} className="seal-btn inline-flex items-center gap-2 px-8 py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition">
            <RefreshCw size={15} /> Shuffle & Reset Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScratchPage;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ScratchPage = () => {
//   const navigate = useNavigate();
//   const [cards, setCards] = useState([]);
//   const [totalWon, setTotalWon] = useState(0);

//   const prizes = [
//     { emoji: '⭐', prize: '20 KOINS', color: 'from-[#D4A017] to-[#FFD700]' },
//     { emoji: '🌟', prize: '50 KOINS', color: 'from-blue-500 to-purple-500' },
//     { emoji: '🎉', prize: '100 KOINS', color: 'from-red-500 to-orange-500' },
//     { emoji: '📚', prize: 'Free Book', color: 'from-emerald-500 to-green-500' },
//     { emoji: '🏆', prize: '200 KOINS', color: 'from-amber-500 to-yellow-500' },
//     { emoji: '🎁', prize: '25 KOINS', color: 'from-pink-500 to-rose-500' },
//   ];

//   useEffect(() => {
//     const shuffled = [...prizes].sort(() => Math.random() - 0.5);
//     setCards(shuffled.map((prize, index) => ({ id: index + 1, ...prize, revealed: false })));
//   }, []);

//   const handleScratch = (id) => {
//     setCards(cards.map(card => {
//       if (card.id === id && !card.revealed) {
//         const amount = parseInt(card.prize) || 0;
//         setTotalWon(prev => prev + amount);
//         return { ...card, revealed: true };
//       }
//       return card;
//     }));
//   };

//   const resetCards = () => {
//     const shuffled = [...prizes].sort(() => Math.random() - 0.5);
//     setCards(shuffled.map((prize, index) => ({ id: index + 1, ...prize, revealed: false })));
//     setTotalWon(0);
//   };

//   if (cards.length === 0) {
//     return <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center text-[#D4A017] text-2xl">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">← Back</button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🎰 Scratch Cards</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Scratch to reveal your prize!</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {[
//             { value: cards.filter(c => c.revealed).length, label: 'Cards Scratched' },
//             { value: cards.filter(c => !c.revealed).length, label: 'Cards Remaining', color: 'text-[#D4A017]/40' },
//             { value: totalWon, label: 'Total KOINS Won', highlight: true },
//           ].map((stat, i) => (
//             <div key={i} className={`bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-xl p-4 text-center border ${stat.highlight ? 'border-[#D4A017]/30 animate-pulse-slow' : 'border-[#D4A017]/20'} shadow-lg`}>
//               <div className={`text-2xl font-bold ${stat.color || 'text-[#D4A017]'}`}>{stat.value}</div>
//               <div className="text-xs text-[#D4A017]/50">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {cards.map((card) => (
//             <div key={card.id} className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
//               <div className={`relative w-full h-48 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${!card.revealed ? 'from-[#1a0f0a] to-[#2d1a0e] border-2 border-[#D4A017]/20' : card.color} transition-all duration-500 transform hover:scale-[1.02]`} onClick={() => handleScratch(card.id)}>
//                 {!card.revealed ? (
//                   <div className="absolute inset-0 flex items-center justify-center flex-col">
//                     <div className="text-6xl mb-2 animate-float">🎁</div>
//                     <p className="text-[#D4A017]/60 text-sm">Click to scratch!</p>
//                     <div className="w-24 h-1 bg-[#D4A017]/20 rounded-full mt-2 overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full animate-pulse" style={{ width: '50%' }} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center flex-col animate-bounce-slow">
//                     <div className="text-6xl mb-2">{card.emoji}</div>
//                     <p className="text-2xl font-bold text-white">🎉 {card.prize}!</p>
//                     <p className="text-white/70 text-sm mt-1">Congratulations!</p>
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-2 mt-4">
//                 <button onClick={() => handleScratch(card.id)} disabled={card.revealed} className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${card.revealed ? 'bg-[#1a0f0a]/60 text-[#D4A017]/30 cursor-not-allowed' : 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] hover:shadow-2xl hover:shadow-[#D4A017]/30 transform hover:scale-105'}`}>
//                   {card.revealed ? '✅ Claimed' : '🔄 Scratch'}
//                 </button>
//                 {card.revealed && <button className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">💰 Claim</button>}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Reset Button */}
//         <div className="mt-6 text-center">
//           <button onClick={resetCards} className="px-8 py-3 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-2xl hover:shadow-[#D4A017]/30 transition-all duration-300 transform hover:scale-105">🔄 Shuffle & Reset Cards</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScratchPage;












// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ScratchPage = () => {
//   const navigate = useNavigate();
//   const [cards, setCards] = useState([
//     { id: 1, revealed: false, prize: '20 KOINS', emoji: '⭐', color: 'from-[#D4A017] to-[#FFD700]' },
//     { id: 2, revealed: false, prize: '50 KOINS', emoji: '🌟', color: 'from-blue-500 to-purple-500' },
//     { id: 3, revealed: false, prize: '100 KOINS', emoji: '🎉', color: 'from-red-500 to-orange-500' },
//     { id: 4, revealed: false, prize: 'Free Book', emoji: '📚', color: 'from-emerald-500 to-green-500' },
//     { id: 5, revealed: false, prize: '200 KOINS', emoji: '🏆', color: 'from-amber-500 to-yellow-500' },
//     { id: 6, revealed: false, prize: '25 KOINS', emoji: '🎁', color: 'from-pink-500 to-rose-500' },
//   ]);

//   const handleScratch = (id) => {
//     setCards(cards.map(card => 
//       card.id === id ? { ...card, revealed: true } : card
//     ));
//   };

//   const totalWon = cards.filter(c => c.revealed).reduce((sum, c) => {
//     const amount = parseInt(c.prize) || 0;
//     return sum + amount;
//   }, 0);

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
//               <h1 className="text-3xl font-bold text-[#D4A017]">🎰 Scratch Cards</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Scratch to reveal your prize!</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">{cards.filter(c => c.revealed).length}</div>
//             <div className="text-xs text-[#D4A017]/50">Cards Scratched</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-[#D4A017]">{cards.filter(c => !c.revealed).length}</div>
//             <div className="text-xs text-[#D4A017]/50">Cards Remaining</div>
//           </div>
//           <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-[#D4A017]/10">
//             <div className="text-2xl font-bold text-emerald-400">{totalWon}</div>
//             <div className="text-xs text-[#D4A017]/50">Total KOINS Won</div>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl hover:shadow-2xl transition"
//             >
//               <div 
//                 className={`relative w-full h-48 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${
//                   !card.revealed ? 'from-[#1a0f0a] to-[#2d1a0e] border-2 border-[#D4A017]/20' : card.color
//                 }`}
//                 onClick={() => handleScratch(card.id)}
//               >
//                 {!card.revealed ? (
//                   <div className="absolute inset-0 flex items-center justify-center flex-col">
//                     <div className="text-6xl mb-2">🎁</div>
//                     <p className="text-[#D4A017]/60 text-sm">Click to scratch!</p>
//                     <div className="w-24 h-1 bg-[#D4A017]/20 rounded-full mt-2" />
//                   </div>
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center flex-col">
//                     <div className="text-6xl mb-2">{card.emoji}</div>
//                     <p className="text-2xl font-bold text-white">🎉 {card.prize}!</p>
//                     <p className="text-white/70 text-sm mt-1">Congratulations!</p>
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-2 mt-4">
//                 <button 
//                   onClick={() => handleScratch(card.id)}
//                   disabled={card.revealed}
//                   className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
//                     card.revealed 
//                       ? 'bg-[#1a0f0a]/60 text-[#D4A017]/30 cursor-not-allowed' 
//                       : 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] hover:shadow-lg hover:shadow-[#D4A017]/20'
//                   }`}
//                 >
//                   {card.revealed ? '✅ Claimed' : '🔄 Scratch'}
//                 </button>
//                 {card.revealed && (
//                   <button className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition">
//                     💰 Claim
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScratchPage;