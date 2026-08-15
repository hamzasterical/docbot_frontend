import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Clinic WhatsApp configuration
  const CLINIC_WHATSAPP_NUMBER = '923710076409';
  const CLINIC_PHONE_DISPLAY = '+92 371 0076409';
  const WHATSAPP_BASE_URL = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}`;

  const getWhatsAppLink = (message = "Hi, I'd like to book a dental appointment at BrightSmile Dental.") => {
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
  };

  const services = [
    {
      id: 'checkup',
      name: 'Dental Checkup & Scan',
      icon: 'stethoscope',
      price: 'PKR 1,500',
      duration: '30 mins',
      description: 'Comprehensive oral examination, digital scan, and personalized treatment plan.',
      waText: "Hi! I'd like to book a Dental Checkup & Scan.",
    },
    {
      id: 'cleaning',
      name: 'Teeth Cleaning & Scaling',
      icon: 'sparkles',
      price: 'PKR 3,500',
      duration: '45 mins',
      description: 'Ultrasonic scaling and polishing to remove plaque, tartar, and surface stains.',
      waText: "Hi! I'd like to book a Teeth Cleaning & Scaling session.",
    },
    {
      id: 'fillings',
      name: 'Composite Fillings',
      icon: 'dentistry',
      price: 'PKR 4,000',
      duration: '40 mins',
      description: 'Natural tooth-colored composite restorations for cavities and minor chips.',
      waText: "Hi! I need an appointment for a Tooth Filling.",
    },
    {
      id: 'root-canal',
      name: 'Root Canal Treatment',
      icon: 'medical_services',
      price: 'PKR 12,000',
      duration: '60 mins',
      description: 'Gentle, modern endodontic therapy with rotary instruments to relieve toothache.',
      waText: "Hi! I'd like to consult for Root Canal Treatment.",
    },
    {
      id: 'extraction',
      name: 'Painless Extraction',
      icon: 'healing',
      price: 'PKR 5,000',
      duration: '45 mins',
      description: 'Safe tooth and wisdom tooth extractions under gentle local anesthesia.',
      waText: "Hi! I'd like to consult for a Tooth Extraction.",
    },
    {
      id: 'whitening',
      name: 'Laser Teeth Whitening',
      icon: 'auto_awesome',
      price: 'PKR 18,000',
      duration: '60 mins',
      description: 'Professional in-clinic laser whitening for a brighter smile in one session.',
      waText: "Hi! I'd like to book a Laser Teeth Whitening session.",
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Message on WhatsApp',
      desc: 'No apps or registration required. Simply click to chat or message us anytime.',
      icon: 'chat',
    },
    {
      num: '02',
      title: 'Pick a Time Slot',
      desc: 'Tell us what treatment you need and choose your preferred morning or evening time.',
      icon: 'event_available',
    },
    {
      num: '03',
      title: 'Instant Confirmation',
      desc: 'Get your appointment confirmation immediately with location details and reminders.',
      icon: 'verified',
    },
  ];

  const faqs = [
    {
      q: 'How does WhatsApp booking work?',
      a: 'When you message us, our automated assistant DocBot helps you choose your treatment, checks real-time doctor availability, and reserves your slot instantly.',
    },
    {
      q: 'Can I reschedule or cancel my appointment?',
      a: 'Yes. Simply send a message on WhatsApp stating "Reschedule" or "Cancel" and you can pick a new date anytime.',
    },
    {
      q: 'Where is the clinic located?',
      a: 'BrightSmile Dental is located at Suite 4B, 2nd Floor, MM Alam Road, Gulberg III, Lahore, with dedicated patient parking.',
    },
    {
      q: 'What are your working hours?',
      a: 'We are open Monday through Saturday from 10:00 AM to 8:00 PM. Our WhatsApp assistant is active 24/7 for bookings.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#181c21] flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* 1. Minimal Header */}
      <header className="sticky top-0 z-50 bg-[#fafaf9]/90 backdrop-blur-md border-b border-[#e8e6e5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl" data-weight="fill">dentistry</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-primary">BrightSmile</span>
              <span className="text-xs text-on-surface-variant block -mt-1 font-medium">Dental Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-on-surface-variant">
            <a href="#services" className="hover:text-primary transition-colors">Services &amp; Pricing</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#location" className="hover:text-primary transition-colors">Location &amp; Hours</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-2 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
            >
              Staff Portal
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-xs hover:shadow transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] rounded-full"
            >
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-on-surface-variant hover:text-primary"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#e8e6e5] bg-white px-4 py-4 space-y-3 shadow-md">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface hover:text-primary py-1"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface hover:text-primary py-1"
            >
              How It Works
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface hover:text-primary py-1"
            >
              Location &amp; Hours
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface hover:text-primary py-1"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-on-surface-variant hover:text-primary font-medium"
              >
                Staff Portal &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. Streamlined Hero Section */}
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column: Clear Text & CTA */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Instant WhatsApp Booking • Lahore</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
                Modern dental care. <br className="hidden sm:inline" />
                <span className="text-primary">Book in 60 seconds.</span>
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience gentle, professional dental treatments in Gulberg, Lahore. Skip phone hold times — chat on WhatsApp to pick your time slot and get confirmed instantly.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="#services"
                  className="w-full sm:w-auto px-5 py-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm rounded-xl border border-outline-variant/50 transition-colors text-center"
                >
                  View Treatments &amp; Fees
                </a>
              </div>

              {/* Minimal Trust Pill Row */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-on-surface-variant font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
                  Certified Specialists
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">schedule</span>
                  Open Mon–Sat (10 AM – 8 PM)
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                  4.9★ Patient Rating
                </span>
              </div>
            </div>

            {/* Right Column: Clean Interactive Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden max-w-sm mx-auto">
                {/* Header */}
                <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#075E54] flex items-center justify-center font-bold text-sm">
                      🦷
                    </div>
                    <div>
                      <h2 className="font-semibold text-xs leading-tight">BrightSmile DocBot</h2>
                      <p className="text-[10px] text-emerald-200">Online • Fast Booking</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-700/60 px-2 py-0.5 rounded text-white font-medium">WhatsApp</span>
                </div>

                {/* Messages */}
                <div className="bg-[#f2efe9] p-4 space-y-3 text-xs">
                  {/* User message */}
                  <div className="self-end bg-[#dcf8c6] text-slate-800 rounded-xl rounded-tr-none p-2.5 max-w-[85%] ml-auto shadow-xs">
                    <p>Hi, I want to book a teeth cleaning session tomorrow.</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1">4:15 PM</span>
                  </div>

                  {/* Bot reply */}
                  <div className="bg-white text-slate-800 rounded-xl rounded-tl-none p-3 max-w-[90%] shadow-xs space-y-2">
                    <p className="font-medium text-primary">DocBot AI:</p>
                    <p>Welcome! We have two slots available for <strong>Teeth Cleaning</strong> tomorrow:</p>

                    <div className="space-y-1.5 pt-1">
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-2.5 py-1.5 font-medium flex items-center justify-between">
                        <span>🕒 3:30 PM (Dr. Sarah)</span>
                        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded">Available</span>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-2.5 py-1.5 font-medium flex items-center justify-between">
                        <span>🕒 5:00 PM (Dr. Usman)</span>
                        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded">Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation pill */}
                  <div className="bg-white/90 border border-emerald-300 rounded-lg p-2 text-center text-slate-700 font-medium text-[11px] flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <span>1-Click booking on WhatsApp</span>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-3 bg-white border-t border-slate-100 text-center">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <span>Start WhatsApp Chat</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Simple 3-Step Process */}
        <section id="how-it-works" className="py-14 sm:py-20 bg-white border-y border-outline-variant/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Fast, frictionless appointment scheduling in 3 steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-[#fafaf9] rounded-xl p-6 border border-outline-variant/40 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-primary bg-white px-2.5 py-1 rounded-md border border-primary/20">
                        {step.num}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">{step.icon}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-on-surface mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Services & Transparent Pricing */}
        <section id="services" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
              Services &amp; Pricing
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Transparent rates with sterile clinical care and certified dental specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-5 border border-outline-variant/40 shadow-2xs hover:shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">{service.icon}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">{service.duration}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-on-surface">
                      {service.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">Fee</span>
                    <span className="text-base font-bold text-primary">{service.price}</span>
                  </div>
                  <a
                    href={getWhatsAppLink(service.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Book</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Location & Working Hours */}
        <section id="location" className="py-14 sm:py-20 bg-white border-y border-outline-variant/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
                Visit BrightSmile Dental
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Conveniently situated in Gulberg III with dedicated parking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Location card */}
              <div className="bg-[#fafaf9] rounded-xl p-6 border border-outline-variant/40 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                  <span>Clinic Address</span>
                </div>
                <p className="text-sm text-on-surface leading-relaxed">
                  Suite 4B, 2nd Floor, MM Alam Road, Gulberg III, Lahore, Pakistan.
                </p>
                <div className="pt-1 text-xs text-on-surface-variant space-y-1">
                  <p><strong>Phone:</strong> {CLINIC_PHONE_DISPLAY}</p>
                  <p><strong>Email:</strong> info@brightsmile.pk</p>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-[#fafaf9] rounded-xl p-6 border border-outline-variant/40 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                  <span>Clinic Hours</span>
                </div>
                <div className="text-xs sm:text-sm space-y-2 text-on-surface">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span>Monday – Friday</span>
                    <span className="font-semibold">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span>Saturday</span>
                    <span className="font-semibold">11:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Sunday</span>
                    <span className="font-medium text-amber-600">Emergency Appointments Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Essential FAQ Accordion */}
        <section id="faq" className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-outline-variant/40 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-medium text-sm text-on-surface flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-base">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-slate-100 bg-[#fafaf9]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Bottom CTA */}
        <section className="py-12 bg-primary text-white text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to schedule your dental visit?
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Message us on WhatsApp to select your doctor and slot in under a minute.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm rounded-full shadow transition-all"
              >
                <span>Chat on WhatsApp</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Clean Minimal Footer */}
      <footer className="bg-[#181c21] text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-slate-200">BrightSmile Dental Studio</p>
            <p className="text-[11px] text-slate-500">MM Alam Road, Gulberg III, Lahore • {CLINIC_PHONE_DISPLAY}</p>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#location" className="hover:text-white transition-colors">Location</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link to="/dashboard" className="hover:text-white text-slate-300 font-medium">Staff Login</Link>
          </div>

          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} BrightSmile. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
