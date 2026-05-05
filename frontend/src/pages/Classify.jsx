import React from 'react';
import ClassifySection from '../components/sections/ClassifySection';

const Classify = () => {
  return (
    <div className="animate-fade-in py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-textPrimary tracking-tight">
          Water <span className="text-primary">Classification</span>
        </h1>
        <p className="text-textSecondary mt-2 max-w-2xl mx-auto">
          Identify water types and optical conditions to optimize image restoration strategies.
        </p>
      </div>
      <ClassifySection />
    </div>
  );
};

export default Classify;
