import React, { useState, useEffect, useRef } from 'react';
import amrScopeBg from '../assets/amr_scope_bg.png';
import amrScopeIndoorAssistant from '../assets/amr_scope_indoor_assistant.png';

export default function AMRScope() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

  const capabilities = [
    {
      id: '01',
      title: 'SITE SURVEILLANCE',
      heading: 'Site Surveillance',
      description: 'Self-navigating robots patrol floors, warehouses, and restricted zones - spotting unattended objects, badge anomalies, and after-hours movement.',
      callout: 'Every alert reaches your team with live video, before an incident becomes a loss.',
      image: amrScopeIndoorAssistant,
      imagePosition: 'object-cover object-center',
    },
    {
      id: '02',
      title: 'INDOOR AI ASSISTANCE',
      heading: 'Indoor AI Assistance',
      description: 'A mobile AI companion that welcomes visitors, manages check-in, guides guests, and answers facility questions instantly.',
      callout: 'Professional, multilingual assistance available every hour of every day.',
      image: amrScopeBg,
      imagePosition: 'object-cover object-center',
    },
  ];

  // Scroll listener to update active scope based on scroll position in both directions
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, progress));

      if (clamped < 0.5) {
        setActiveTab(0);
      } else {
        setActiveTab(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (idx) => {
    setActiveTab(idx);
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.pageYOffset + rect.top;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + idx * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="amr" ref={sectionRef} className="relative w-full h-[240vh]">
      {/* Sticky Container pinning the section while scrolling */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0B]">
        {/* Huge Watermark 02 (26:252) */}
        <div 
          className="absolute -top-[10px] xl:-top-[30px] right-0 xl:right-[-9px] font-space font-bold text-[160px] sm:text-[210px] xl:text-[250px] select-none pointer-events-none leading-none z-0 opacity-40 pr-0"
          style={{
            background: 'linear-gradient(0deg, rgba(120, 120, 120, 0.3) 0%, rgba(40, 40, 40, 0.05) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          02
        </div>

        {/* Section Header (26:216) - Center Aligned */}
        <div className="max-w-[1920px] w-full mx-auto px-6 sm:px-12 lg:px-[160px] relative z-10 text-center pt-16 sm:pt-20 lg:pt-[90px] mb-12 lg:mb-16">
          {/* SectionIndex (26:217) */}
          <div className="inline-flex items-center justify-center gap-3 mb-1.5">
            <span className="font-space font-medium text-sm sm:text-base text-[#EC8922]">2.0</span>
            <span className="w-6 h-[0.6px] bg-[#EC8922]/60"></span>
            <span className="font-space text-xs sm:text-sm font-semibold tracking-widest text-[#7A7A85] uppercase">MOBILE INTELLIGENCE</span>
          </div>

          {/* Heading + Subtitle Frame (26:223) */}
          <div className="flex flex-col items-center gap-6 mt-1">
            <h2 
              className="font-orbitron font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide text-center"
              style={{
                background: 'linear-gradient(180deg, rgba(202, 200, 200, 1) 0%, rgba(107, 107, 107, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AMR Capabilities
            </h2>

            <p className="font-space text-xs sm:text-sm lg:text-base text-[#9A9AA5] max-w-3xl mx-auto leading-relaxed text-center font-normal">
              Autonomy for the ground - indoor floors, corridors, and controlled zones held under continuous intelligent patrol.
            </p>
          </div>
        </div>

        {/* Full-Width Showcase Area (Edge-to-Edge matching Figma) */}
        <div className="relative w-full flex-1 overflow-hidden">
          {/* Background Images with Smooth Crossfade */}
          {capabilities.map((cap, idx) => (
            <div
              key={cap.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={cap.image}
                alt={cap.heading}
                className={`w-full h-full ${cap.imagePosition || 'object-cover object-center'}`}
              />
              {/* Linear overlay matching Drone Scope (+10% opacity and subtle top ambient contrast) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-[#0A0A0B]/25 via-35% to-[#0A0A0B]/30 pointer-events-none" />
            </div>
          ))}

          {/* Top-Right Capability Tabs (26:233) - Aligned with Figma 160px margin */}
          <div className="absolute top-6 sm:top-8 lg:top-10 right-6 sm:right-12 lg:right-[160px] z-30 flex flex-col gap-4 sm:gap-6 items-start">
            {capabilities.map((cap, idx) => {
              const isActive = activeTab === idx;
              const isLast = idx === capabilities.length - 1;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleTabClick(idx)}
                  className={`inline-flex flex-col w-fit text-left transition-all duration-300 group cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                    isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="inline-flex items-center gap-3 sm:gap-5">
                    <span
                      className={`font-space font-medium text-xs sm:text-sm lg:text-base transition-colors ${
                        isActive ? 'text-[#F3AC4A]' : 'text-[#FAFAFA] group-hover:text-white'
                      }`}
                    >
                      {cap.id}
                    </span>

                    <span
                      className={`w-5 sm:w-8 h-[0.6px] transition-colors ${
                        isActive ? 'bg-[#F3AC4A]' : 'bg-[#FAFAFA]/60 group-hover:bg-white'
                      }`}
                    />

                    <span
                      className={`font-orbitron text-base sm:text-xl lg:text-2xl font-medium tracking-wider uppercase transition-colors whitespace-nowrap ${
                        isActive
                          ? 'text-[#F3AC4A] drop-shadow-[0_0_12px_rgba(243,172,74,0.5)]'
                          : 'text-[#FAFAFA] group-hover:text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]'
                      }`}
                    >
                      {cap.title}
                    </span>
                  </div>

                  {/* Thin Stroke below each scope heading (omitted for last item) */}
                  {!isLast && (
                    <div
                      className={`w-full h-[0.6px] mt-2.5 sm:mt-3 transition-colors ${
                        isActive ? 'bg-[#F3AC4A]/40' : 'bg-white/[0.08] group-hover:bg-white/[0.15]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Content Area with Smooth Crossfade - Aligned with Figma 160px margin */}
          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-12 lg:left-[160px] right-6 sm:right-12 lg:right-[160px] z-30">
            <div className="relative min-h-[90px] max-w-[1920px] mx-auto">
              {capabilities.map((cap, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={cap.id}
                    className={`transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative z-10'
                        : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none z-0'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end">
                      {/* Left: Heading & Description */}
                      <div className="lg:col-span-8">
                        <h3 className="font-space font-bold text-2xl sm:text-3xl lg:text-[40px] lg:leading-[48px] text-[#C1C1C1] mb-6">
                          {cap.heading}
                        </h3>
                        <p className="font-space text-xs sm:text-sm lg:text-[16px] lg:leading-[24px] text-[#FAFAFA] leading-relaxed max-w-2xl font-light">
                          {cap.description}
                        </p>
                      </div>

                      {/* Right: Security Callout */}
                      <div className="lg:col-span-4 lg:text-right">
                        <p className="font-space text-xs sm:text-sm lg:text-[16px] lg:leading-[24px] text-[#FAFAFA] font-light leading-normal max-w-sm ml-auto">
                          {cap.callout}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
