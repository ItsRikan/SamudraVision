import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const ImageCompare = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border group" ref={containerRef}>
      {/* Container maintains aspect ratio based on an arbitrary height or image natural size. 
          Using a fixed height for consistency in the UI layout */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-secondarySurface">

        {/* Before Image (Bottom Layer) */}
        <img
          src={beforeImage}
          alt="Before enhancement"
          className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* After Image (Top Layer, clipped) */}
        <img
          src={afterImage}
          alt="After enhancement"
          className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* Labels */}
        <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-textPrimary uppercase tracking-wider border border-white/10 z-10 pointer-events-none">
          Raw
        </div>
        <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-primary uppercase tracking-wider border border-primary/30 z-10 pointer-events-none">
          Enhanced
        </div>

        {/* Range Input (Invisible, for interaction) */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
        />

        {/* Custom Slider Line and Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-primary z-10 pointer-events-none shadow-[0_0_10px_rgba(0,212,255,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-surface border-2 border-primary rounded-full flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-transform duration-100 ease-out group-hover:scale-110">
            <ChevronsLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompare;
