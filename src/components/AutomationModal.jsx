import React, { useState, useRef } from 'react';
import cavinLogo from '../assets/cavin_logo.svg';
import TurnstileWidget from './TurnstileWidget';

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/jainaressh.b@cavininfotech.com';

export default function AutomationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    mobileNumber: '',
    organization: '',
    interestedIn: 'Both', // Drone | AMR | Both
    _honey: '', // Honeypot field for bot mitigation
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  if (!isOpen) return null;

  const validateForm = () => {
    const trimmedName = formData.fullName.trim();
    const trimmedOrg = formData.organization.trim();
    const trimmedEmail = formData.workEmail.trim();
    const trimmedPhone = formData.mobileNumber.trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      setErrorMessage('Please enter a valid full name (2–100 characters).');
      return false;
    }

    if (!trimmedOrg || trimmedOrg.length < 2 || trimmedOrg.length > 100) {
      setErrorMessage('Please enter a valid organization name (2–100 characters).');
      return false;
    }

    // RFC 5322 compliant regex for email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      setErrorMessage('Please enter a valid work email address.');
      return false;
    }

    // Phone validation: allows optional +, digits, spaces, hyphens, min 7 digits, max 20 chars
    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || trimmedPhone.length > 20) {
      setErrorMessage('Please enter a valid phone number (minimum 7 digits).');
      return false;
    }

    // Cloudflare Turnstile verification check
    if (!turnstileToken) {
      setErrorMessage('Please complete the security verification below.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check: If bot filled hidden field, simulate success silently without sending
    if (formData._honey) {
      setSubmitted(true);
      return;
    }

    // Client-side rate-limiting / spam click prevention (minimum 5s cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setErrorMessage('Please wait a few seconds before submitting again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setLastSubmitTime(now);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Full Name': formData.fullName.trim(),
          'Organization': formData.organization.trim(),
          'Work Email': formData.workEmail.trim(),
          'Mobile Number': formData.mobileNumber.trim(),
          'Interested In': formData.interestedIn === 'Both' ? 'Drone & AMR' : formData.interestedIn,
          'cf-turnstile-response': turnstileToken,
          '_subject': `New Automation Inquiry: ${formData.fullName.trim()} (${formData.organization.trim()})`,
          '_template': 'table',
          '_captcha': 'false',
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        setSubmitted(true);
      } else if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage('Unable to submit inquiry at this moment. Please try again or reach out directly.');
        setTurnstileToken('');
        turnstileRef.current?.reset();
      }
    } catch {
      setErrorMessage('Network connection error. Please verify your internet and try again.');
      setTurnstileToken('');
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setLoading(false);
    setErrorMessage('');
    setTurnstileToken('');
    turnstileRef.current?.reset();
    setFormData({
      fullName: '',
      workEmail: '',
      mobileNumber: '',
      organization: '',
      interestedIn: 'Both',
      _honey: '',
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl transition-all duration-300"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="automation-modal-title"
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-[880px] bg-[#0E0E10] border border-white/[0.08] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(236,137,34,0.06)] overflow-hidden flex flex-col md:flex-row transition-all my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Visual Brand Pillar */}
        <div className="relative md:w-[280px] lg:w-[320px] bg-gradient-to-b from-[#18191E] to-[#0A0A0B] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.06] shrink-0">
          {/* Subtle Ambient Glow Effects */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#EC8922]/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <img 
              src={cavinLogo} 
              alt="Cavin Infotech Logo" 
              className="w-[90px] h-auto object-contain mb-6 opacity-90"
            />
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC8922] animate-pulse" />
              <span className="font-space text-[11px] uppercase tracking-wider text-[#A9A9A9] font-medium">Next-Gen Autonomous</span>
            </div>
            <h3 className="font-orbitron font-bold text-xl lg:text-2xl text-white uppercase tracking-wide leading-tight">
              Scale With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC8922] to-[#F59E0B]">
                Intelligent Fleet
              </span>
            </h3>
          </div>

          {/* Feature Badge / Tagline Card */}
          <div className="relative z-10 mt-8 md:mt-0 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            <p className="font-space text-xs text-[#A9A9A9] leading-relaxed">
              Custom-built Drone surveillance & AMR floor automation validated on real industrial grounds.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] font-space text-[#7A7A85]">
              <span>Response Time</span>
              <span className="text-[#EC8922] font-semibold">&lt; 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative bg-[#0E0E10]">
          {/* Close Button */}
          <button 
            onClick={resetAndClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A9A9A9] hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Header Title */}
              <div>
                <h2 id="automation-modal-title" className="font-orbitron font-bold text-2xl text-white tracking-wide">
                  Let's Talk
                </h2>
                <p className="font-space text-xs sm:text-sm text-[#7A7A85] mt-1 font-normal">
                  Connect with our robotics engineers to engineer your deployment.
                </p>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-space flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users, traps spam bots) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="_honey_field">Leave this empty</label>
                <input
                  id="_honey_field"
                  type="text"
                  name="_honey"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData._honey}
                  onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
                />
              </div>

              {/* Interested In - Tab Selector */}
              <div>
                <label className="block font-space text-xs font-medium uppercase tracking-wider text-[#A9A9A9] mb-2">
                  Interested In
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Drone', 'AMR', 'Both'].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setFormData({ ...formData, interestedIn: option })}
                      className={`py-2.5 px-3 rounded-lg font-space text-xs sm:text-sm font-medium transition-all duration-200 border text-center cursor-pointer ${
                        formData.interestedIn === option
                          ? 'bg-[#EC8922]/10 border-[#EC8922] text-[#EC8922] shadow-[0_0_15px_rgba(236,137,34,0.15)]'
                          : 'bg-white/[0.02] border-white/[0.06] text-[#7A7A85] hover:border-white/[0.15] hover:text-white'
                      }`}
                    >
                      {option === 'Both' ? 'Drone & AMR' : option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-space text-xs font-medium uppercase tracking-wider text-[#A9A9A9] mb-1.5">
                    Full Name <span className="text-[#EC8922]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#141519] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#52535A] focus:outline-none focus:border-[#EC8922] focus:ring-1 focus:ring-[#EC8922] transition-all font-space"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block font-space text-xs font-medium uppercase tracking-wider text-[#A9A9A9] mb-1.5">
                    Organization <span className="text-[#EC8922]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Company or Enterprise"
                    className="w-full bg-[#141519] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#52535A] focus:outline-none focus:border-[#EC8922] focus:ring-1 focus:ring-[#EC8922] transition-all font-space"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block font-space text-xs font-medium uppercase tracking-wider text-[#A9A9A9] mb-1.5">
                    Work Email <span className="text-[#EC8922]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-[#141519] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#52535A] focus:outline-none focus:border-[#EC8922] focus:ring-1 focus:ring-[#EC8922] transition-all font-space"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-space text-xs font-medium uppercase tracking-wider text-[#A9A9A9] mb-1.5">
                    Mobile Number <span className="text-[#EC8922]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    autoComplete="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#141519] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#52535A] focus:outline-none focus:border-[#EC8922] focus:ring-1 focus:ring-[#EC8922] transition-all font-space"
                  />
                </div>
              </div>

              {/* Cloudflare Turnstile Security Verification */}
              <div className="pt-1 flex flex-col items-center">
                <TurnstileWidget
                  ref={turnstileRef}
                  action="automation_inquiry"
                  theme="dark"
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setErrorMessage('');
                  }}
                  onError={() => {
                    setTurnstileToken('');
                    setErrorMessage('Security verification failed. Please try again.');
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                    setErrorMessage('Security verification expired. Please verify again.');
                  }}
                />
              </div>

              {/* Catchy CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-lg font-space font-medium text-sm sm:text-base text-white transition-all duration-300 hover:brightness-110 active:scale-[0.99] border border-transparent [background:linear-gradient(#EC8922,#D97706)_padding-box,linear-gradient(135deg,#FFFFFF_0%,#EC8922_50%,#92400E_100%)_border-box] shadow-[0_4px_20px_rgba(236,137,34,0.35)] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center font-space text-[11px] text-[#52535A] mt-2.5">
                  Direct engineer consult • Zero spam • NDA protected
                </p>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#EC8922]/15 border border-[#EC8922]/40 flex items-center justify-center mb-6 text-[#EC8922] shadow-[0_0_30px_rgba(236,137,34,0.2)]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                Transmission Received
              </h3>
              <p className="font-space text-sm text-[#A9A9A9] max-w-sm leading-relaxed mb-8">
                Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Our robotics engineering team will review your requirements for <span className="text-[#EC8922] font-medium">{formData.organization}</span> and reach out within 24 hours.
              </p>
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-sm font-space text-white transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
