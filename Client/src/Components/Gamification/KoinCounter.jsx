import React, { useState } from 'react';

const KoinCounter = ({ 
  koins = 0, 
  streak = 7, 
  level = 1, 
  nextLevelKoins = 100,
  dailyBonus = 25,
  totalEarned = 450
}) => {
  const [showBonus, setShowBonus] = useState(false);
  const progress = Math.min((koins / nextLevelKoins) * 100, 100);

  const handleDailyBonus = () => {
    setShowBonus(true);
    setTimeout(() => setShowBonus(false), 3000);
  };

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4A017] to-[#8B6914] rounded-full flex items-center justify-center text-3xl shadow-lg shadow-[#D4A017]/20 animate-pulse-slow">
            ⭐
          </div>
          <div>
            <p className="text-[#D4A017]/50 text-sm">Your Balance</p>
            <p className="text-3xl font-bold text-[#D4A017]">{koins.toLocaleString()} KOINS</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-[#D4A017]/50 text-sm">Streak</p>
              <p className="font-bold text-[#f5ede4]">{streak} days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-[#D4A017]/50 mb-1">
          <span>Level {level}</span>
          <span>{koins} / {nextLevelKoins} KOINS</span>
        </div>
        <div className="w-full h-3 bg-[#1a0f0a]/80 rounded-full overflow-hidden border border-[#D4A017]/10">
          <div 
            className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
          <div className="text-sm font-bold text-[#D4A017]">{totalEarned}</div>
          <div className="text-[10px] text-[#D4A017]/30">Total Earned</div>
        </div>
        <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
          <div className="text-sm font-bold text-[#D4A017]">{dailyBonus}</div>
          <div className="text-[10px] text-[#D4A017]/30">Daily Bonus</div>
        </div>
        <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
          <div className="text-sm font-bold text-[#D4A017]">{level}</div>
          <div className="text-[10px] text-[#D4A017]/30">Current Level</div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={handleDailyBonus}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition relative"
        >
          🎁 Daily Bonus
          {showBonus && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
              +{dailyBonus} KOINS!
            </span>
          )}
        </button>
        <button className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition">
          💰 Redeem
        </button>
      </div>
    </div>
  );
};

export default KoinCounter;