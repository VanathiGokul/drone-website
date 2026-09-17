import React from 'react';
import amrOutcomeAgv from '../assets/amr_outcome_agv.webp';
import amrOutcomeIsaac from '../assets/amr_outcome_isaac.webp';
import amrOutcomeRover from '../assets/amr_outcome_rover.webp';
import amrOutcomeSecurity from '../assets/amr_outcome_security.webp';
import amrOutcomeDelivery from '../assets/amr_outcome_delivery.webp';
import amrOutcomeIndoorAssistance from '../assets/amr_outcome_indoor_assistance.webp';

export default function AMROutcomes() {
  const outcomes = [
    {
      title: 'AGV',
      image: amrOutcomeAgv,
      description: 'AGV technology enables reliable point to point material movement along predefined routes, improving transport efficiency, reducing manual handling, and supporting consistent operations across warehouses, factories, and industrial facilities.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 1', highlight: false },
        { label: 'STAGE', value: 'Validated Prototype', highlight: false },
      ],
    },
    {
      title: 'ROBOT SIMULATION & ISAAC',
      image: amrOutcomeIsaac,
      description: 'Robot simulation using NVIDIA Isaac, Gazebo, and RViz enables teams to test navigation, perception, workflows, and autonomous behavior virtually, reducing deployment risks and accelerating AMR development.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 2', highlight: false },
        { label: 'STAGE', value: 'In Development', highlight: false },
      ],
    },
    {
      title: 'INDUSTRIAL AUTOMATION ROVER',
      image: amrOutcomeRover,
      description: 'Industrial automation rovers autonomously handle inspection, monitoring, material movement, and repetitive tasks, improving safety, operational efficiency, and productivity while reducing manual intervention across complex industrial environments.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 1', highlight: false },
        { label: 'STAGE', value: 'In Development', highlight: false },
      ],
    },
    {
      title: 'SECURITY BOT',
      image: amrOutcomeSecurity,
      description: 'Security bots autonomously patrol facilities, detect unusual activity, monitor restricted zones, and provide real time alerts, improving site visibility, response speed, and safety while reducing continuous manual surveillance.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 2', highlight: false },
        { label: 'STAGE', value: 'Validated Prototype', highlight: false },
      ],
    },
    {
      title: 'DELIVERY BOT',
      image: amrOutcomeDelivery,
      description: 'Delivery bots autonomously transport goods, documents, and supplies across facilities, reducing manual movement, improving delivery speed, and ensuring reliable, contactless, and efficient internal logistics operations.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 1', highlight: false },
        { label: 'STAGE', value: 'In Development', highlight: false },
      ],
    },
    {
      title: 'INDOOR AI ASSISTANCE',
      image: amrOutcomeIndoorAssistance,
      description: 'Indoor AI assistance robots guide visitors, answer queries, provide directions, and support facility interactions, delivering responsive, multilingual, and consistent assistance while improving accessibility, efficiency, and overall visitor experience.',
      badges: [
        { label: 'STATUS', value: 'Research Stage', highlight: true },
        { label: 'PHASE', value: 'Phase 2', highlight: false },
        { label: 'STAGE', value: 'Validated Prototype', highlight: false },
      ],
    },
  ];

  return (
    <section id="amr-projects" className="relative w-full py-8 lg:py-[90px] overflow-hidden scroll-mt-[76px] sm:scroll-mt-[88px] lg:scroll-mt-[100px]">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-12 lg:px-[160px]">
        {/* Section Header Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-space font-medium text-sm sm:text-base text-[#EC8922]">2.1</span>
              <span className="w-6 h-[0.6px] bg-[#EC8922]/60"></span>
              <span className="font-space text-xs sm:text-sm font-semibold tracking-widest text-[#7A7A85] uppercase">ENGINEERED FOR IMPACT</span>
            </div>
            <h2 
              className="font-orbitron font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide leading-[1.2] sm:leading-[1.2] lg:leading-[1.2]"
              style={{
                background: 'linear-gradient(180deg, rgba(202, 200, 200, 1) 0%, rgba(107, 107, 107, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Research &<br />Outcome
            </h2>
          </div>

          <div className="max-w-[768px] w-full lg:ml-auto lg:text-right">
            <p className="font-space text-[15px] sm:text-base lg:text-lg leading-relaxed text-[#A9A9A9] font-normal lg:text-right">
              Our in-house AMR team builds autonomy, AI driven missions, and<br className="hidden lg:block" />
              multi robot coordination, enabling intelligent assistants to welcome, guide,<br className="hidden lg:block" />
              support, and serve visitors reliably across dynamic facilities.
            </p>
          </div>
        </div>

        {/* 2 Outcome Cards Grid (26:314) - width: 1600px, gap: 16px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
          {outcomes.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0E0E10] flex flex-col transition-all duration-300 hover:border-[#EC8922]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Image Banner */}
              <div className="relative w-full h-[280px] sm:h-[360px] overflow-hidden bg-black/40 flex items-center justify-center p-3 lg:p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent opacity-90 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-10 lg:p-[40px] flex-1 flex flex-col justify-start lg:justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-[18px] sm:text-2xl lg:text-[28px] leading-tight lg:leading-[32px] text-[#D5D5D5] mb-4 lg:mb-6">
                    {item.title}
                  </h3>
                  <p className="font-space text-sm sm:text-base lg:text-[16px] lg:leading-[24px] text-[#9A9AA5] leading-relaxed mb-4 lg:mb-8 font-light">
                    {item.description}
                  </p>
                </div>

                {/* Status Badges Group */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:pt-2">
                  {item.badges.map((badge, bIdx) => (
                    <div
                      key={bIdx}
                      className={`px-4 py-3 rounded-lg flex flex-col justify-center gap-1.5 border transition-all ${
                        badge.highlight
                          ? 'bg-[#EC8922]/[0.08] border-[#EC8922]/40'
                          : 'bg-white/[0.03] border-white/[0.08]'
                      }`}
                    >
                      <span
                        className={`font-orbitron text-[11px] sm:text-[12px] tracking-wider font-semibold uppercase ${
                          badge.highlight ? 'text-[#F3AC4A]' : 'text-[#7A7A85]'
                        }`}
                      >
                        {badge.label}
                      </span>
                      <span className="font-space text-[14px] sm:text-xs lg:text-sm text-[#D5D5D5] font-normal leading-tight">
                        {badge.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
