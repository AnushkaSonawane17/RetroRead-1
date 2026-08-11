import React from 'react';

const BadgeDisplay = ({ badges = [] }) => {
  const defaultBadges = [
    { id: 1, name: 'First Reader', icon: '📖', description: 'Read your first book', unlocked: true },
    { id: 2, name: 'Bookworm', icon: '🐛', description: 'Read 10 books', unlocked: true },
    { id: 3, name: 'Streak Master', icon: '🔥', description: '7-day reading streak', unlocked: true },
    { id: 4, name: 'Book Collector', icon: '📚', description: 'Own 20 books', unlocked: false },
    { id: 5, name: 'Reviewer Pro', icon: '✍️', description: 'Write 5 reviews', unlocked: false },
    { id: 6, name: 'Exchange Expert', icon: '🔄', description: 'Complete 10 exchanges', unlocked: false },
    { id: 7, name: 'Trivia Champion', icon: '🧠', description: 'Win 5 trivia games', unlocked: false },
    { id: 8, name: 'Guess Master', icon: '🎯', description: 'Guess 10 books correctly', unlocked: false },
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-[#f5ede4]">🏅 Your Badges</h3>
        <span className="text-sm text-[#D4A017]">{displayBadges.filter(b => b.unlocked).length}/{displayBadges.length}</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className={`
              p-3 rounded-xl text-center transition-all duration-300
              ${badge.unlocked 
                ? 'bg-gradient-to-br from-[#D4A017]/20 to-[#8B6914]/10 border-2 border-[#D4A017]/30 hover:scale-105 cursor-pointer' 
                : 'bg-[#1a0f0a]/60 border-2 border-[#D4A017]/5 opacity-50'
              }
            `}
          >
            <div className={`text-3xl mb-1 ${badge.unlocked ? 'animate-bounce-slow' : ''}`}>
              {badge.icon}
            </div>
            <p className="text-xs font-semibold text-[#f5ede4] truncate">{badge.name}</p>
            <p className="text-[10px] text-[#D4A017]/40 truncate">{badge.description}</p>
            {!badge.unlocked && (
              <span className="text-[10px] text-[#D4A017]/30">🔒 Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeDisplay;