import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import { Shield, Target, Cpu } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      
      {/* How it works section */}
      <section className="py-24 bg-secondarySurface/30 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-16 tracking-tight">
            Designed for <span className="text-primary">Mission-Critical</span> Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection lines (desktop only) */}
            <div className="hidden md:block absolute top-1/4 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-textPrimary">Step 1: Raw Capture</h3>
              <p className="text-textSecondary max-w-xs">
                Upload degraded underwater images or live sonar/video feeds into the system.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                <Cpu className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-textPrimary">Step 2: AI Enhancement</h3>
              <p className="text-textSecondary max-w-xs">
                Our deep learning models filter out noise and restore true environmental clarity.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-textPrimary">Step 3: Analyze</h3>
              <p className="text-textSecondary max-w-xs">
                Review high-fidelity results with full metrics for tactical decision making.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
