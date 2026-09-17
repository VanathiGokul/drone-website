import React from 'react';
import iconAmrSiteSecure from '../assets/icon_amr_site_secure.svg';
import iconIndoorAssistant from '../assets/icon_indoor_assistant.svg';

export default function AMRResearch() {
  const cards = [
    {
      id: '01',
      title: 'Site Secure',
      icon: iconAmrSiteSecure,
      description: 'Built on ROS2, our AMRs run AI enhanced mission and task handling, planning routes, executing patrols, and accomplishing security missions independently or in coordinated joint operations. One coordinated system maintains constant environmental awareness, sharing detections across the fleet in real time.',
    },
    {
      id: '02',
      title: 'Indoor AI Assistant',
      icon: iconIndoorAssistant,
      description: 'Engineering a Smart AI companion assistant: vision language AI on an autonomous platform that converses naturally, navigates crowded spaces with full environmental awareness, and handles visitor and facility tasks, working standalone or joining joint missions alongside the security fleet and Cavin drones.',
    },
  ];

  return (
    <section className="relative w-full py-8 lg:py-[90px] overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-12 lg:px-[160px]">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="font-space font-medium text-sm sm:text-base text-[#EC8922]">2.2</span>
            <span className="w-6 h-[0.6px] bg-[#EC8922]/60"></span>
            <span className="font-space text-xs sm:text-sm font-semibold tracking-widest text-[#7A7A85] uppercase">AMR RESEARCH</span>
          </div>

          <h2 
            className="font-orbitron font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mb-6"
            style={{
              background: 'linear-gradient(180deg, rgba(202, 200, 200, 1) 0%, rgba(107, 107, 107, 1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AMR Research
          </h2>

          <p className="font-space text-[15px] sm:text-base lg:text-lg leading-relaxed text-[#9A9AA5] max-w-4xl mx-auto font-normal text-center">
            Our ground robotics team discovers, builds, and implements the full stack in house,
            ROS2 based autonomy, AI enhanced mission handling, and multi robot coordination, proving
            every system in live facilities before it enters yours
          </p>
        </div>

        {/* 2 Research Cards Grid (26:264) - width: 1600px, gap: 16px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#0E0E10] border border-white/[0.07] rounded-2xl p-8 sm:p-10 lg:p-[48px_36px] flex flex-col justify-between transition-all duration-300 hover:border-[#EC8922]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Card Top: Icon and Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-2.5">
                    <img src={card.icon} alt={card.title} className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-orbitron font-bold text-xs sm:text-sm text-[#7A7A85] tracking-widest">
                    {card.id}
                  </span>
                </div>

                {/* Card Title (26:275 / 26:300) */}
                <h3 className="font-space font-bold text-2xl sm:text-[32px] sm:leading-[41px] text-[#D5D5D5] mb-6">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-space text-sm sm:text-base lg:text-[18px] lg:leading-[26px] text-[#A9A9A9] leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
