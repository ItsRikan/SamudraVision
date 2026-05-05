import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Sonar Pulse Background */}
      <div className="absolute inset-0 z-0 sonar-bg opacity-30"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
          <Zap className="w-4 h-4" />
          <span>Next-Generation Underwater Vision</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-textPrimary mb-6 leading-tight">
          AI-Powered Underwater <br />
          <span className="text-primary">Image Enhancement</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-textSecondary mb-10 leading-relaxed">
          The state-of-the-art solution for maritime defense and underwater surveillance. 
          Restore clarity, remove turbidity, and extract critical intelligence from degraded underwater footage.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <NavLink
            to="/enhance"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-background font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
          >
            Enhance Image
            <ArrowRight className="w-5 h-5" />
          </NavLink>
          <NavLink
            to="/benchmark"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-border hover:border-primary/50 text-textPrimary font-bold rounded-lg transition-all duration-300"
          >
            Run Benchmark
          </NavLink>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-8 glass-card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-3">Image Enhancement</h3>
            <p className="text-textSecondary leading-relaxed">
              Remove water turbidity, color casts, and backscatter using advanced deep learning models.
            </p>
          </div>
          
          <div className="glass-card p-8 glass-card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-3">Quality Metrics</h3>
            <p className="text-textSecondary leading-relaxed">
              Real-time PSNR and SSIM benchmarks to quantify enhancement performance against ground truth.
            </p>
          </div>
          
          <div className="glass-card p-8 glass-card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-3">Water Classification</h3>
            <p className="text-textSecondary leading-relaxed">
              Automatically identify water types to optimize enhancement parameters for specific environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
