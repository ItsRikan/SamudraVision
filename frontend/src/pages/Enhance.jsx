import React from 'react';
import EnhanceSection from '../components/sections/EnhanceSection';

const Enhance = () => {
  return (
    <div className="animate-fade-in py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl font-bold text-textPrimary tracking-tight">
          Image <span className="text-primary">Enhancement</span>
        </h1>
        <p className="text-textSecondary mt-2">
          Restore clarity and detail to degraded underwater images using neural networks.
        </p>
      </div>
      <EnhanceSection />
    </div>
  );
};

export default Enhance;
