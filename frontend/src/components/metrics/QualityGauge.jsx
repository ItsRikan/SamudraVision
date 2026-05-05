import React from 'react';

const QualityGauge = ({ 
  value, 
  min = 0, 
  max = 100, 
  unit = '', 
  title, 
  thresholds = { good: 70, excellent: 90 },
  colorScheme = 'blue' // 'blue', 'emerald', 'teal', 'orange'
}) => {
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = (normalizedValue - min) / (max - min);
  
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference / 2;
  const strokeDashoffset = arcLength - (percentage * arcLength);

  // Determine color based on thresholds
  let colorClass = 'text-error';
  if (normalizedValue >= thresholds.excellent) {
    colorClass = colorScheme === 'blue' ? 'text-blue-500' : 'text-success';
  } else if (normalizedValue >= thresholds.good) {
    colorClass = colorScheme === 'blue' ? 'text-sky-400' : 'text-warning';
  } else if (normalizedValue >= thresholds.good * 0.7) {
    colorClass = 'text-orange-500';
  }

  return (
    <div className="flex flex-col items-center relative w-full max-w-[200px]">
      <svg
        viewBox="0 0 160 100"
        className="w-full drop-shadow-md"
        style={{ overflow: 'visible' }}
      >
        <path
          d={`M 20,80 A ${radius},${radius} 0 0,1 140,80`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-surface border-border opacity-30"
        />
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
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease'
          }}
        />
      </svg>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className={`text-3xl font-bold ${colorClass}`}>
          {value.toFixed(unit === 'dB' ? 2 : (max <= 1 ? 4 : 2))}
        </span>
        <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mt-1">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default QualityGauge;
