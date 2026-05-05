import React from 'react';

const PSNRGauge = ({ value }) => {
  // SVG Gauge logic
  const min = 0;
  const max = 50;
  const radius = 60;
  const strokeWidth = 12;
  const normalizedValue = Math.min(Math.max(value, min), max);
  
  // Calculate stroke dasharray for a semi-circle (arc)
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference / 2); // 180 degrees
  
  const percentage = normalizedValue / max;
  const strokeDashoffset = arcLength - (percentage * arcLength);

  // Determine color based on value
  let colorClass = 'text-error';
  if (normalizedValue >= 40) {
    colorClass = 'text-success';
  } else if (normalizedValue >= 30) {
    colorClass = 'text-warning';
  } else if (normalizedValue >= 20) {
    colorClass = 'text-orange-500'; // Orange is handled via utility or inline
  }

  return (
    <div className="flex flex-col items-center relative w-full max-w-[200px]">
      <svg
        viewBox="0 0 160 100"
        className="w-full drop-shadow-md"
        style={{ overflow: 'visible' }}
      >
        {/* Background Arc */}
        <path
          d={`M 20,80 A ${radius},${radius} 0 0,1 140,80`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-surface border-border opacity-50"
        />
        
        {/* Foreground (Value) Arc */}
        <path
          d={`M 20,80 A ${radius},${radius} 0 0,1 140,80`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colorClass}
          style={{
            strokeDasharray: `${arcLength} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease'
          }}
        />
      </svg>
      
      {/* Value Display */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className={`text-3xl font-bold ${colorClass}`}>
          {normalizedValue.toFixed(2)}
        </span>
        <span className="text-xs font-semibold text-textSecondary tracking-wider">dB</span>
      </div>
    </div>
  );
};

export default PSNRGauge;
