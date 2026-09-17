import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import cavinLogo from '../assets/cavin_logo.svg';

export default function Navbar({ activeSection, onNavigate, onOpenContact }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'drone', label: 'Drone' },
    { id: 'drone-projects', label: 'Drone Projects' },
    { id: 'amr', label: 'AMR' },
    { id: 'amr-projects', label: 'AMR Projects' },
  ];

  const handleMobileClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const handleMobileContactClick = () => {
    setIsMobileMenuOpen(false);
    onOpenContact();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121418]/95 backdrop-blur-md border-b border-white/[0.06] transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-12 lg:px-[160px] h-[76px] sm:h-[88px] lg:h-[100px] flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group focus:outline-none shrink-0">
          <img 
            src={cavinLogo} 
            alt="Cavin Infotech Logo" 
            className="w-[90px] h-[50px] sm:w-[100px] sm:h-[56.6px] lg:w-[120px] lg:h-[67.92px] object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative py-1 font-space text-[16px] lg:text-[18px] leading-[23px] font-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                activeSection === item.id ? 'text-[#EC8922]' : 'text-[#A9A9A9] hover:text-[#EC8922]'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#EC8922] transition-all duration-300 ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenContact}
            className="relative p-[1px] rounded-[6px] overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Revolving stroke gradient light beam in light & dark grey metallic gradient */}
            <span 
              className="absolute inset-[-200%] animate-revolve pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, #18191E 0%, #2A2D35 30%, #525663 55%, #E2E4EB 80%, #FFFFFF 90%, #686D7A 95%, #18191E 100%)'
              }}
            />

            {/* Inner Button Surface */}
            <span className="relative z-10 block px-5 py-2.5 lg:py-3 rounded-[5px] bg-[#121418] font-space font-medium text-[15px] lg:text-[16px] leading-[20.4px] text-white transition-all duration-300 group-hover:bg-[#181a20] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Let's connect
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Button (Right side on mobile) */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white hover:text-[#EC8922] hover:border-[#EC8922]/40 transition-colors focus:outline-none active:scale-95"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-200" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-[#0D0E11] border-b border-white/[0.1] shadow-[0_25px_50px_rgba(0,0,0,0.95)] ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-5 px-5 sm:px-8 pointer-events-auto' : 'max-h-0 opacity-0 py-0 px-5 sm:px-8 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3">
          {/* Menu Items Container with Card Background */}
          <div className="bg-[#14161D] border border-white/[0.08] rounded-xl p-2 flex flex-col gap-1.5 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-space text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#EC8922]/15 text-[#EC8922] border border-[#EC8922]/40 font-semibold shadow-[0_0_15px_rgba(236,137,34,0.15)]'
                      : 'bg-white/[0.02] border border-white/[0.04] text-[#D0D0D0] hover:bg-white/[0.06] hover:text-[#EC8922] hover:border-white/[0.1]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-[#EC8922] translate-x-1' : 'text-[#7A7A85]'}`} />
                </button>
              );
            })}
          </div>

          {/* Mobile CTA Button */}
          <div>
            <button
              type="button"
              onClick={handleMobileContactClick}
              className="relative w-full p-[1px] rounded-[8px] overflow-hidden group cursor-pointer transition-transform duration-300 active:scale-[0.98] block"
            >
              <span 
                className="absolute inset-[-200%] animate-revolve pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, #18191E 0%, #2A2D35 30%, #525663 55%, #E2E4EB 80%, #FFFFFF 90%, #686D7A 95%, #18191E 100%)'
                }}
              />
              <span className="relative z-10 block w-full py-3.5 px-4 text-center rounded-[7px] bg-[#16181E] font-space font-medium text-[16px] text-white transition-all duration-300 group-hover:bg-[#1C1F26]">
                Let's connect
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
