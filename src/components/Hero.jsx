import React from 'react';
import heroDrone from '../assets/hero_drone.png';
import heroAmr from '../assets/hero_amr.png';

export default function Hero() {
  return (
    <section className="relative w-full bg-[#121418] overflow-hidden flex flex-col justify-between">
      {/* Background Atmosphere Blur Ellipse 1 (26:24) - x: 651px, y: -342px, w: 1673.73px, h: 1263.13px, fill: #969BA7, blur(500px) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-[651px] top-[-342px] w-[900px] xl:w-[1673.73px] h-[600px] xl:h-[1263.13px] bg-[#969BA7] rounded-full blur-[160px] xl:blur-[500px] opacity-30 pointer-events-none z-0"
      />

      <div className="max-w-[1920px] w-full mx-auto relative z-10 px-6 sm:px-12 lg:px-[160px] flex flex-col justify-between flex-1">
        {/* Main Headline (26:26) - Orbitron Bold 88px, line-height 120px, uppercase, center, linear-gradient(#CAC8C8 15%, #6B6A6A 83%) */}
        <div className="pt-6 sm:pt-10 xl:pt-[44px] pb-2 text-center max-w-[1600px] mx-auto">
          <h1 
            className="font-orbitron font-bold text-[32px] sm:text-[50px] md:text-[66px] xl:text-[88px] leading-[1.12] xl:leading-[116px] uppercase tracking-normal"
            style={{
              background: 'linear-gradient(180deg, rgba(202, 200, 200, 1) 15%, rgba(107, 106, 106, 1) 83%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Autonomous Innovation<br className="hidden sm:inline" /> Across Air & Ground
          </h1>
        </div>

        {/* Hero Visual Showcase + Mission Statement Grid - Anchored Flush to Bottom */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-end mt-2">
          {/* 3D Pedestal Drone & AMR Interactive Showcase */}
          <div className="lg:col-span-8 relative flex justify-center lg:justify-start items-end self-end">
            <div className="relative w-full max-w-6xl xl:max-w-[1140px] aspect-[1672/1020] -mb-8 lg:-mb-12 origin-bottom scale-[1.05] lg:scale-[1.08] pointer-events-none">
              {/* Drone Layer (Floats First with extended pedestal) */}
              <div 
                className="absolute inset-0 w-full h-full z-10 origin-bottom animate-float-drone pointer-events-auto transition-transform duration-700 hover:scale-[1.02]"
              >
                <img
                  src={heroDrone}
                  alt="Autonomous Drone on pedestal"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] block select-none"
                />
              </div>

              {/* AMR Layer (Floats Second with extended pedestal) */}
              <div 
                className="absolute inset-0 w-full h-full z-20 origin-bottom animate-float-amr pointer-events-auto transition-transform duration-700 hover:scale-[1.02]"
              >
                <img
                  src={heroAmr}
                  alt="Autonomous Mobile Robot (AMR) on pedestal"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] block select-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column Mission Statement (26:33) - Space Grotesk Regular 20px, line-height 28px, color #A9A9A9, max-width 556px, top-aligned with Drone */}
          <div className="lg:col-span-4 flex flex-col justify-start items-end self-start pt-4 sm:pt-6 lg:pt-8 xl:pt-10 xl:pl-4">
            <p className="font-space font-normal text-right text-[16px] sm:text-[18px] xl:text-[20px] leading-[26px] xl:leading-[28px] text-[#A9A9A9] max-w-[556px]">
              We tinker intelligent drones and autonomous mobile robots that secure, survey, and support your most critical operations, putting real-time intelligence in front of leadership 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
