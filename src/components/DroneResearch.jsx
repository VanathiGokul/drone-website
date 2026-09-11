import React from 'react';
import iconSiteSecure from '../assets/icon_site_secure.svg';
import iconFireFighting from '../assets/icon_fire_fighting.svg';
import icon3dMap from '../assets/icon_3d_map.svg';

export default function DroneResearch() {
  const cards = [
    {
      id: '01',
      title: 'Site Secure',
      icon: iconSiteSecure,
      description: 'Engineering autonomous patrol intelligence: composite-vision AI for real-time intrusion detection, sensor-fusion tracking in low light, geo-fenced mission planning, and autonomous suspect-follow behaviour - validated in night trials across live industrial sites.',
    },
    {
      id: '02',
      title: 'Fire Fighting',
      icon: iconFireFighting,
      description: 'Building early-ignition intelligence: real-time thermal image processing and multispectral hotspot detection, wind-driven fire-dispersion modelling, and autonomous coordinated response - rehearsed in live-fire drills and industrial accident simulations.',
    },
    {
      id: '03',
      title: '3D Map',
      icon: icon3dMap,
      description: 'Implementing 3D LiDAR scanning with autonomous AI mission accomplishing - drones that plan, fly, and complete mapping missions on their own - fusing LiDAR point clouds with thermal and photogrammetric imagery into digital twins.',
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-[90px] overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[160px]">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="font-space font-medium text-sm sm:text-base text-[#EC8922]">1.2</span>
            <span className="w-6 h-[0.6px] bg-[#EC8922]/60"></span>
            <span className="font-space text-xs sm:text-sm font-semibold tracking-widest text-[#7A7A85] uppercase">DRONE RESEARCH</span>
          </div>

          <h2 
            className="font-orbitron font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mb-6"
            style={{
              background: 'linear-gradient(180deg, rgba(202, 200, 200, 1) 0%, rgba(107, 107, 107, 1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Research
          </h2>

          <p className="font-space text-base sm:text-lg text-[#9A9AA5] max-w-4xl mx-auto leading-relaxed font-normal text-center">
            Nothing on this page is a concept. Our engineers discover, build, and field-prove every<br className="hidden md:block" />
            technology in live industrial conditions before it reaches your site - a continuous loop&nbsp;of<br className="hidden md:block" />
            <span className="text-white font-semibold">Discover → Engineer → Field-test → Deploy.</span>
          </p>
        </div>

        {/* 3 Research Cards Grid (44:469) - gap: 16px, padding: 48px 36px, bg: #0E0E10, border: 0.67px solid rgba(255,255,255,0.07) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">
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

                {/* Card Title (44:474) - Space Grotesk Bold 32px #D5D5D5 */}
                <h3 className="font-space font-bold text-2xl sm:text-[32px] sm:leading-[41px] text-[#D5D5D5] mb-6">
                  {card.title}
                </h3>

                {/* Card Description (44:476) - Space Grotesk Regular 18px #A9A9A9 */}
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
