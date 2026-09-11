import React from 'react';

export default function ExecutiveCTA() {
  return (
    <section id="contact" className="relative w-full py-16 sm:py-20 lg:py-[90px] overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[160px]">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <p className="font-space font-normal text-[11px] leading-[16.5px] tracking-[0.2em] uppercase text-[#7A7A85] max-w-3xl">
            BOOK A 30-MINUTE EXECUTIVE BRIEFING. WE'LL WALK YOU THROUGH THE TECHNOLOGY, THE ROLLOUT PLAN, AND THE BUSINESS CASE - THEN SHOW YOU A LIVE DEMO BUILT AROUND YOUR FACILITY. CTA: BOOK AN EXECUTIVE DEMO
          </p>

          <a
            href="#contact"
            className="px-4 py-3 rounded-[4px] font-space font-medium text-[16px] leading-[20.4px] text-white transition-all duration-300 hover:brightness-125 border border-transparent [background:linear-gradient(#0D0E10,#0D0E10)_padding-box,linear-gradient(134deg,#989898_0%,#6B6B6B_48%,#989898_100%)_border-box]"
          >
            Book an Executive Demo
          </a>
        </div>
      </div>
    </section>
  );
}
