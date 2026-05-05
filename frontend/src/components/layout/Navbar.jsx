import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Waves, Menu, X } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { endpoints } from '../../api/endpoints';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [health, setHealth] = useState({ status: 'unknown', checking: true });

  const checkHealth = async () => {
    try {
      const data = await endpoints.checkHealth();
      setHealth({ status: data.status === 'healthy' ? 'healthy' : 'error', checking: false });
    } catch (err) {
      setHealth({ status: 'error', checking: false });
    }
  };

  useEffect(() => {
    checkHealth();
    const intervalId = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(intervalId);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Enhance', path: '/enhance' },
    { name: 'Benchmark', path: '/benchmark' },
    { name: 'Classify', path: '/classify' },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary bg-primary/10'
        : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <Waves className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-wider text-textPrimary">
                Samudra<span className="text-primary">Vision</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={getNavLinkClass}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side - Health Status */}
          <div className="hidden md:flex items-center">
            <StatusBadge status={health.status} loading={health.checking} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <StatusBadge status={health.status} loading={health.checking} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-textSecondary hover:text-textPrimary focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-secondarySurface'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
