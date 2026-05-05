import React from 'react';

const MetricsCard = ({ title, children, tooltip, className = '' }) => {
  return (
    <div className={`glass-card p-6 flex flex-col items-center justify-center relative group ${className}`}>
      <h3 className="text-lg font-semibold text-textPrimary mb-4 text-center">{title}</h3>
      
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48">
          <div className="bg-surface border border-border text-textSecondary text-xs rounded-lg p-2 shadow-lg text-center">
            {tooltip}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-surface border-b border-r border-border"></div>
          </div>
        </div>
      )}
      
      <div className="w-full flex justify-center items-center flex-grow">
        {children}
      </div>
    </div>
  );
};

export default MetricsCard;
