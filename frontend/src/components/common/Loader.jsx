import React from 'react';

const Loader = ({ message = "Processing..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Sonar rings */}
        <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute w-24 h-24 border-2 border-primary/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-500"></div>
        <div className="absolute w-16 h-16 border-2 border-primary/60 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000"></div>
        
        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(0,212,255,0.8)]"></div>
      </div>
      
      <p className="mt-8 text-primary font-medium tracking-wide animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
