import React from 'react';
import { Waves } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg tracking-wider text-textPrimary">
              Samudra<span className="text-primary">Vision</span>
            </span>
          </div>
          
          <div className="text-textSecondary text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} SamudraVision. AI-Powered Underwater Image Enhancement for Maritime Defense.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <span className="text-textSecondary hover:text-primary transition-colors cursor-pointer">Terms</span>
            <span className="text-textSecondary hover:text-primary transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
