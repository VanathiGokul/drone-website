import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DroneScope from './components/DroneScope';
import DroneResearch from './components/DroneResearch';
import DroneOutcomes from './components/DroneOutcomes';
import AMRScope from './components/AMRScope';
import AMRResearch from './components/AMRResearch';
import AMROutcomes from './components/AMROutcomes';
import Footer from './components/Footer';
import AutomationModal from './components/AutomationModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('drone');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Handle smooth navigation when clicking navbar tabs
  const handleNavigate = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -90; // account for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active navbar indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['drone', 'drone-projects', 'amr', 'amr-projects', 'footer'];
      const scrollPos = window.pageYOffset + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] flex flex-col selection:bg-[#EC8922]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero />

        {/* 1.0 Drone Scope */}
        <DroneScope />

        {/* 1.2 Drone Outcomes */}
        <DroneOutcomes />

        {/* 2.0 AMR Scope */}
        <AMRScope />

        {/* 2.2 AMR Outcomes */}
        <AMROutcomes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Automation Consultation Modal */}
      <AutomationModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
