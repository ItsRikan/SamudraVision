import React from 'react';
import BenchmarkSection from '../components/sections/BenchmarkSection';

const Benchmark = () => {
  return (
    <div className="animate-fade-in py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl font-bold text-textPrimary tracking-tight">
          Performance <span className="text-primary">Benchmark</span>
        </h1>
        <p className="text-textSecondary mt-2">
          Quantify the enhancement quality using standard imaging metrics.
        </p>
      </div>
      <BenchmarkSection />
    </div>
  );
};

export default Benchmark;
