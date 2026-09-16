import React from 'react';
import cavinLogo from '../assets/cavin_logo.svg';

export default function Footer() {
  return (
    <footer id="footer" className="relative w-full border-t border-white/[0.04] bg-[#0D0E10] overflow-hidden">
      {/* Top Center Glow Ellipse (26:366) - w: 780px, h: 11px, fill: #D9D9D9, blur(140px) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[780px] h-[11px] bg-[#D9D9D9] blur-[140px] pointer-events-none opacity-40" />

      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[160px] py-[60px]">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <a href="https://cavininfotech.com/" target="_blank" rel="noopener noreferrer">
              <img
                src={cavinLogo}
                alt="Cavin Infotech Logo"
                className="w-[100px] h-[56.6px] lg:w-[120px] lg:h-[67.92px] object-contain transition-transform hover:scale-105"
              />
            </a>
          </div>

          {/* Center: Copyrights 2026 Cavin Infotech */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 inline-flex items-center gap-2 font-normal text-[15px] sm:text-[16px] lg:text-[18px] text-[#A9A9A9] font-space whitespace-nowrap">
            <span>Copyrights</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 shrink-0 stroke-[#A9A9A9]"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M9.8 6.2C9.4 5.7 8.8 5.4 8.1 5.4C6.7 5.4 5.7 6.5 5.7 8C5.7 9.5 6.7 10.6 8.1 10.6C8.8 10.6 9.4 10.3 9.8 9.8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span>2026 Cavin Infotech</span>
          </div>

          {/* Right: Visit Cavin Infotech + Privacy Policy + Terms & Conditions (20px gap) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-[20px] text-[15px] sm:text-[16px] lg:text-[18px] leading-[23px] font-space text-[#A9A9A9]">
            <a
              href="https://cavininfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-[#EC8922] hover:text-[#f3ac4a] transition-colors"
            >
              Visit Cavin Infotech
            </a>

            <a href="#privacy" className="font-normal text-[#A9A9A9] hover:text-white transition-colors">
              Privacy Policy
            </a>

            <a href="#terms" className="font-normal text-[#A9A9A9] hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
