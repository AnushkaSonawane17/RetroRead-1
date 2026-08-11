import React, { useState, useEffect } from 'react';

const StreakTracker = ({ initialStreak = 7 }) => {
  const [streak, setStreak] = useState(initialStreak);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekDays.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        read: i < streak
      });
    }
    setDays(weekDays);
  }, [streak]);

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-[#f5ede4]">🔥 Reading Streak</h3>
          <p className="text-[#D4A017]/50 text-sm">Keep reading daily!</p>
        </div>
        <div className="text-right">
          <div className="text-3xl">🔥</div>
          <div className="text-2xl font-bold text-[#D4A017]">{streak} days</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-[#D4A017]/50 mb-1">{day.day}</div>
            <div className={`
              w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold
              ${day.read 
                ? 'bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] shadow-lg shadow-[#D4A017]/20' 
                : 'bg-[#1a0f0a]/60 text-[#D4A017]/30 border border-[#D4A017]/10'}
            `}>
              {day.read ? '✓' : '○'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition">
          Log Today's Reading
        </button>
      </div>
    </div>
  );
};

// ✅ THIS MUST BE AT THE END
export default StreakTracker;