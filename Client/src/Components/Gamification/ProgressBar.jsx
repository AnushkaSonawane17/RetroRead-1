import React from 'react';

const ProgressBar = ({ 
  title = "Reading Progress",
  current = 150,
  total = 500,
  icon = "📖",
  color = "from-[#D4A017] to-[#8B6914]",
  showDetails = true
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  const getStatusEmoji = () => {
    if (percentage >= 100) return '🎉';
    if (percentage >= 75) return '🔥';
    if (percentage >= 50) return '💪';
    if (percentage >= 25) return '📖';
    return '🌱';
  };

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-bold text-[#f5ede4]">{title}</h3>
            {showDetails && (
              <p className="text-[#D4A017]/50 text-sm">{current} / {total} pages</p>
            )}
          </div>
        </div>
        <div className="text-2xl">{getStatusEmoji()}</div>
      </div>

      <div className="relative">
        <div className="w-full h-3 bg-[#1a0f0a]/80 rounded-full overflow-hidden border border-[#D4A017]/10">
          <div 
            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="absolute -top-6 right-0 text-sm font-bold text-[#D4A017]">
          {Math.round(percentage)}%
        </div>
      </div>

      <div className="flex justify-between mt-3 text-xs text-[#D4A017]/30">
        <span>🌱 Start</span>
        <span>📖 25%</span>
        <span>💪 50%</span>
        <span>🔥 75%</span>
        <span>🎉 100%</span>
      </div>

      {showDetails && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
            <div className="text-sm font-bold text-[#D4A017]">{current}</div>
            <div className="text-[10px] text-[#D4A017]/30">Pages Read</div>
          </div>
          <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
            <div className="text-sm font-bold text-[#D4A017]">{total - current}</div>
            <div className="text-[10px] text-[#D4A017]/30">Pages Left</div>
          </div>
          <div className="bg-[#1a0f0a]/80 rounded-xl p-2 text-center border border-[#D4A017]/10">
            <div className="text-sm font-bold text-[#D4A017]">{Math.round(percentage)}%</div>
            <div className="text-[10px] text-[#D4A017]/30">Complete</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ THIS MUST BE AT THE END
export default ProgressBar;