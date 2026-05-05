import React from 'react';

const SSIMBar = ({ value }) => {
  const min = 0.0;
  const max = 1.0;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = normalizedValue * 100;

  // Determine color
  let colorClass = 'bg-error';
  let textClass = 'text-error';
  if (normalizedValue >= 0.9) {
    colorClass = 'bg-success';
    textClass = 'text-success';
  } else if (normalizedValue >= 0.8) {
    colorClass = 'bg-warning';
    textClass = 'text-warning';
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full h-6 bg-surface rounded-full overflow-hidden border border-border">
        {/* Progress Bar */}
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Gradient Overlay for visual effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <span className="text-xs text-textSecondary">0.0</span>
        <span className={`text-2xl font-bold ${textClass}`}>
          {normalizedValue.toFixed(4)}
        </span>
        <span className="text-xs text-textSecondary">1.0</span>
      </div>
    </div>
  );
};

export default SSIMBar;
