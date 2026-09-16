import React from 'react';
import cavinLogo from '../assets/cavin_logo.svg';

export default function Navbar({ activeSection, onNavigate, onOpenContact }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#121418]/90 backdrop-blur-md border-b border-white/[0.04] transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[160px] h-[88px] lg:h-[100px] flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group focus:outline-none shrink-0">
          <img 
            src={cavinLogo} 
            alt="Cavin Infotech Logo" 
            className="w-[100px] h-[56.6px] lg:w-[120px] lg:h-[67.92px] object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-5 sm:gap-8 lg:gap-10 xl:gap-12">
          <button
            onClick={() => onNavigate('drone')}
            className={`group relative py-1 font-space text-[14px] sm:text-[16px] lg:text-[18px] leading-[23px] font-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeSection === 'drone' ? 'text-[#EC8922]' : 'text-[#A9A9A9] hover:text-[#EC8922]'
            }`}
          >
            Drone
            <span className={`absolute bottom-0 left-0 h-[0.6px] bg-[#EC8922] transition-all duration-300 ${
              activeSection === 'drone' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </button>

          <button
            onClick={() => onNavigate('drone-projects')}
            className={`group relative py-1 font-space text-[14px] sm:text-[16px] lg:text-[18px] leading-[23px] font-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeSection === 'drone-projects' ? 'text-[#EC8922]' : 'text-[#A9A9A9] hover:text-[#EC8922]'
            }`}
          >
            Drone Projects
            <span className={`absolute bottom-0 left-0 h-[0.6px] bg-[#EC8922] transition-all duration-300 ${
              activeSection === 'drone-projects' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </button>

          <button
            onClick={() => onNavigate('amr')}
            className={`group relative py-1 font-space text-[14px] sm:text-[16px] lg:text-[18px] leading-[23px] font-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeSection === 'amr' ? 'text-[#EC8922]' : 'text-[#A9A9A9] hover:text-[#EC8922]'
            }`}
          >
            AMR
            <span className={`absolute bottom-0 left-0 h-[0.6px] bg-[#EC8922] transition-all duration-300 ${
              activeSection === 'amr' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </button>

          <button
            onClick={() => onNavigate('amr-projects')}
            className={`group relative py-1 font-space text-[14px] sm:text-[16px] lg:text-[18px] leading-[23px] font-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeSection === 'amr-projects' ? 'text-[#EC8922]' : 'text-[#A9A9A9] hover:text-[#EC8922]'
            }`}
          >
            AMR Projects
            <span className={`absolute bottom-0 left-0 h-[0.6px] bg-[#EC8922] transition-all duration-300 ${
              activeSection === 'amr-projects' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </button>

        </nav>

        {/* Contact CTA with Revolving Border Stroke */}
        <div className="flex items-center shrink-0">
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
            <span className="relative z-10 block px-4 py-2.5 lg:py-3 rounded-[5px] bg-[#121418] font-space font-medium text-[14px] lg:text-[16px] leading-[20.4px] text-white transition-all duration-300 group-hover:bg-[#181a20] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Let's connect
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
