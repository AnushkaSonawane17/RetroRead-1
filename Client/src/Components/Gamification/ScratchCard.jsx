import React, { useState } from 'react';

const ScratchCard = ({ 
  prize = "20 KOINS", 
  onScratch = null,
  isRevealed = false,
  cardNumber = 1 
}) => {
  const [revealed, setRevealed] = useState(isRevealed);
  const [progress, setProgress] = useState(0);

  const prizes = [
    { emoji: '⭐', amount: '20 KOINS', color: 'from-[#D4A017] to-[#FFD700]' },
    { emoji: '🌟', amount: '50 KOINS', color: 'from-blue-500 to-purple-500' },
    { emoji: '🎉', amount: '100 KOINS', color: 'from-red-500 to-orange-500' },
    { emoji: '📚', amount: 'Free Book', color: 'from-emerald-500 to-green-500' },
    { emoji: '🏆', amount: '200 KOINS', color: 'from-amber-500 to-yellow-500' },
  ];

  const currentPrize = prizes[cardNumber % prizes.length];

  const handleScratch = () => {
    if (!revealed) {
      setRevealed(true);
      setProgress(100);
      if (onScratch) onScratch();
    }
  };

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-[#f5ede4]">🎰 Scratch Card #{cardNumber}</h3>
        <span className="text-sm text-[#D4A017]/50">Click to reveal</span>
      </div>

      <div 
        className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#1a0f0a] to-[#2d1a0e] border-2 border-[#D4A017]/20"
        onClick={handleScratch}
      >
        {!revealed ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-gradient-to-br from-[#D4A017]/20 to-[#8B6914]/20">
            <div className="text-6xl mb-2">🎁</div>
            <p className="text-[#D4A017]/60 text-sm">Scratch to reveal your prize!</p>
            <div className="w-32 h-1 bg-[#D4A017]/20 rounded-full mt-2">
              <div className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center flex-col bg-gradient-to-br ${currentPrize.color}`}>
            <div className="text-6xl mb-2">{currentPrize.emoji}</div>
            <p className="text-2xl font-bold text-white">🎉 {currentPrize.amount}!</p>
            <p className="text-white/70 text-sm mt-1">Congratulations!</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={handleScratch}
          disabled={revealed}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
            revealed 
              ? 'bg-[#1a0f0a]/60 text-[#D4A017]/30 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] hover:shadow-lg hover:shadow-[#D4A017]/20'
          }`}
        >
          {revealed ? '✅ Claimed' : '🔄 Scratch Now'}
        </button>
        <button className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition">
          💰 Claim
        </button>
      </div>
    </div>
  );
};

// ✅ THIS MUST BE AT THE END
export default ScratchCard;