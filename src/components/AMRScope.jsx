import React, { useState, useEffect, useRef } from 'react';
import amrScopeBg from '../assets/amr_scope_bg.webp';
import amrScopeIndoorAssistant from '../assets/amr_scope_indoor_assistant.webp';

export default function AMRScope() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const capabilities = [
    {
      id: '01',
      title: 'SITE SURVEILLANCE',
      heading: 'Site Surveillance',
      description: 'Self navigating robots patrol floors, warehouses, and restricted zones, spotting unattended objects, badge anomalies, and after hours movement.',
      callout: 'Every alert reaches your team with live video, before an incident becomes a loss.',
      image: amrScopeIndoorAssistant,
      imagePosition: 'object-cover object-center',
    },
    {
      id: '02',
      title: 'INDOOR AI ASSISTANCE',
      heading: 'Indoor AI Assistance',
      description: 'A mobile AI companion that welcomes visitors, manages check in, guides guests, and answers facility questions instantly.',
      callout: 'Professional, multilingual assistance available every hour of every day.',
      image: amrScopeBg,
      imagePosition: 'object-cover object-center',
    },
  ];

  // Preload all images on mount to avoid decoding flickers
  useEffect(() => {
    capabilities.forEach((cap) => {
      const img = new Image();
      img.src = cap.image;
    });
  }, []);

  // Scroll listener to update active scope based on scroll position with rAF & hysteresis (Desktop ONLY)
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (window.innerWidth < 1024) return;
        if (isProgrammaticScroll.current) return;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const progress = -rect.top / totalScrollable;
        const clamped = Math.max(0, Math.min(1, progress));

        setActiveTab((prev) => {
          // Hysteresis buffering for smooth 2-tab switching
          if (prev === 0) {
            return clamped > 0.55 ? 1 : 0;
          } else {
            return clamped < 0.45 ? 0 : 1;
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleTabClick = (idx) => {
    setActiveTab(idx);

    // For mobile version: tabs switch purely on click without forcing page scroll
    if (window.innerWidth < 1024) return;

    // For desktop version: scroll smoothly to corresponding position
    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    // Prevent scroll listener from oscillating activeTab during smooth scroll
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1200);

    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.pageYOffset + rect.top;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + idx * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="amr" ref={sectionRef} className="relative w-full h-auto lg:h-[240vh] border-t border-white/[0.04] scroll-mt-[76px] sm:scroll-mt-[88px] lg:scroll-mt-[100px]">
      {/* Sticky Container on desktop, natural fluid container on mobile */}
      <div className="relative lg:sticky top-0 w-full h-auto lg:h-screen flex flex-col justify-start lg:justify-between overflow-hidden bg-[#0A0A0B] pb-8 lg:pb-0">
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
        <div className="max-w-[1920px] w-full mx-auto px-5 sm:px-12 lg:px-[160px] relative z-10 text-center pt-8 lg:pt-[90px] mb-5 lg:mb-16 shrink-0">
          {/* SectionIndex (26:217) */}
          <div className="inline-flex items-center justify-center gap-3 mb-1">
            <span className="font-space font-medium text-sm sm:text-base text-[#EC8922]">2.0</span>
            <span className="w-6 h-[0.6px] bg-[#EC8922]/60"></span>
            <span className="font-space text-xs sm:text-sm font-semibold tracking-widest text-[#7A7A85] uppercase">MOBILE INTELLIGENCE</span>
          </div>

          {/* Heading + Subtitle Frame (26:223) - 24px spacing */}
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

            <p className="font-space text-[15px] sm:text-base lg:text-lg leading-relaxed text-[#9A9AA5] max-w-3xl mx-auto text-center font-normal">
              Autonomy for the ground, indoor floors, corridors, and controlled zones held under continuous intelligent patrol.
            </p>
          </div>
        </div>

        {/* Mobile Layout (< lg): Adaptive full-width 16:9 showcase */}
        <div className="flex flex-col lg:hidden flex-1 justify-start px-5 pb-0">
          {/* Capability Selector Tabs for Mobile (20px below body text, 16px above image) */}
          <div className="flex items-center justify-between gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] mb-4">
            {capabilities.map((cap, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleTabClick(idx)}
                  className={`flex-1 py-1.5 px-1 sm:px-2 text-center rounded-lg font-space font-medium transition-all duration-300 flex flex-col items-center gap-1 ${
                    isActive
                      ? 'bg-[#EC8922]/15 text-[#EC8922] border border-[#EC8922]/30 shadow-[0_0_12px_rgba(236,137,34,0.15)] font-semibold'
                      : 'text-[#A9A9A9] hover:text-white border border-transparent'
                  }`}
                >
                  <span className="font-orbitron text-[12px] block leading-none">{cap.id}</span>
                  <span className="truncate block leading-tight text-[14px]">{cap.heading}</span>
                </button>
              );
            })}
          </div>

          {/* Full Width Adaptive 16:9 Image Container (16px below tabs) */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#141518]">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out transform-gpu will-change-[opacity] ${
                  activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={cap.image}
                  alt={cap.heading}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover object-center transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Bottom Content Description for Mobile (16px below image) */}
          <div className="mt-4 relative min-h-[120px]">
            {capabilities.map((cap, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={cap.id}
                  className={`transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-1 absolute inset-0 pointer-events-none z-0'
                  }`}
                >
                  <h3 className="font-space font-bold text-base text-[#FAFAFA] mb-1.5">
                    {cap.heading}
                  </h3>
                  <p className="font-space text-[14px] leading-[20px] text-[#9A9AA5] font-normal mb-2.5">
                    {cap.description}
                  </p>
                  {cap.callout && (
                    <p className="font-space text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#E0E0E0] font-light border-l-2 border-[#EC8922]/70 pl-2.5 py-0.5">
                      {cap.callout}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout (>= lg): Full-Bleed Edge-to-Edge matching Figma */}
        <div className="hidden lg:block relative w-full flex-1 overflow-hidden">
          {/* Background Images with Smooth Crossfade */}
          {capabilities.map((cap, idx) => (
            <div
              key={cap.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out transform-gpu will-change-[opacity] ${
                activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={cap.image}
                alt={cap.heading}
                loading="eager"
                decoding="sync"
                className={`w-full h-full transform-gpu transition-transform duration-1000 ease-out ${cap.imagePosition || 'object-cover object-center'} ${
                  activeTab === idx ? 'scale-100' : 'scale-[1.03]'
                }`}
              />
              {/* Linear overlay matching Figma */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-[#0A0A0B]/25 via-35% to-[#0A0A0B]/30 pointer-events-none" />
            </div>
          ))}

          {/* Top-Right Capability Tabs (26:233) - Aligned with Figma 160px margin */}
          <div className="absolute top-10 right-[160px] z-30 flex flex-col gap-6 items-start">
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
                  <div className="inline-flex items-center gap-5">
                    <span
                      className={`font-space font-medium text-base transition-colors ${
                        isActive ? 'text-[#F3AC4A]' : 'text-[#FAFAFA] group-hover:text-white'
                      }`}
                    >
                      {cap.id}
                    </span>

                    <span
                      className={`w-8 h-[0.6px] transition-colors ${
                        isActive ? 'bg-[#F3AC4A]' : 'bg-[#FAFAFA]/60 group-hover:bg-white'
                      }`}
                    />

                    <span
                      className={`font-orbitron text-2xl font-medium tracking-wider uppercase transition-colors whitespace-nowrap ${
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
                      className={`w-full h-[0.6px] mt-3 transition-colors ${
                        isActive ? 'bg-[#F3AC4A]/40' : 'bg-white/[0.08] group-hover:bg-white/[0.15]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Content Area with Smooth Crossfade - Aligned with Figma 160px margin */}
          <div className="absolute bottom-10 left-[160px] right-[160px] z-30">
            <div className="relative min-h-[90px] max-w-[1920px] mx-auto">
              {capabilities.map((cap, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={cap.id}
                    className={`transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative z-10'
                        : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none z-0'
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-6 items-end">
                      {/* Left: Heading & Description */}
                      <div className="col-span-8">
                        <h3 className="font-space font-bold text-[40px] leading-[48px] text-[#C1C1C1] mb-6">
                          {cap.heading}
                        </h3>
                        <p className="font-space text-[16px] leading-[24px] text-[#FAFAFA] leading-relaxed max-w-2xl font-light">
                          {cap.description}
                        </p>
                      </div>

                      {/* Right: Security Callout */}
                      <div className="col-span-4 text-right">
                        <p className="font-space text-[16px] leading-[24px] text-[#FAFAFA] font-light leading-normal max-w-sm ml-auto">
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
