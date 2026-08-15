import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Clinic WhatsApp configuration (Placeholder — replace with clinic's registered number)
  const CLINIC_WHATSAPP_NUMBER = '923001234567'; // Format: country code + number without plus or spaces
  const CLINIC_PHONE_DISPLAY = '+92 300 1234567';
  const WHATSAPP_BASE_URL = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}`;
  const getWhatsAppLink = (message = "Hi DocBot, I'd like to book a dental appointment at BrightSmile Dental.") => {
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
  };

  const services = [
    {
      id: 'checkup',
      name: 'Dental Checkup & Consultation',
      urdu: 'معائنہ اور مشاورت',
      icon: 'stethoscope',
      badge: 'Preventative',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      price: 'PKR 1,500',
      duration: '30 mins',
      description: 'Comprehensive oral examination, digital intraoral camera scan, and personalized treatment plan.',
      waText: "Hi DocBot, I'd like to book a Dental Checkup & Consultation."
    },
    {
      id: 'cleaning',
      name: 'Teeth Cleaning & Polishing',
      urdu: 'دانتوں کی صفائی اور پالش',
      icon: 'sparkles',
      badge: 'Most Popular',
      badgeColor: 'bg-primary/10 text-primary border-primary/20',
      price: 'PKR 3,500',
      duration: '45 mins',
      description: 'Ultrasonic scaling to eliminate plaque, calculus, and surface stains for fresh breath and healthy gums.',
      waText: "Hi DocBot, I'd like to book a Teeth Cleaning & Polishing session."
    },
    {
      id: 'fillings',
      name: 'Tooth Fillings & Restoration',
      urdu: 'دانتوں کی فلنگ',
      icon: 'dentistry',
      badge: 'Restorative',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      price: 'PKR 4,000',
      duration: '40 mins',
      description: 'Durable, natural tooth-colored composite resin fillings to repair cavities and restore function.',
      waText: "Hi DocBot, I need an appointment for a Tooth Filling."
    },
    {
      id: 'root-canal',
      name: 'Root Canal Treatment (RCT)',
      urdu: 'روٹ کینال کا علاج',
      icon: 'medical_services',
      badge: 'Painless Care',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      price: 'PKR 12,000',
      duration: '60 mins',
      description: 'Gentle, modern endodontic therapy using rotary instruments to save natural teeth and eliminate toothache.',
      waText: "Hi DocBot, I'd like to consult for Root Canal Treatment (RCT)."
    },
    {
      id: 'extraction',
      name: 'Painless Tooth Extraction',
      urdu: 'دانت نکالنا',
      icon: 'healing',
      badge: 'Surgical',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      price: 'PKR 5,000',
      duration: '45 mins',
      description: 'Safe extraction of damaged or impacted teeth including wisdom teeth under painless local anesthesia.',
      waText: "Hi DocBot, I need to book a Tooth Extraction consultation."
    },
    {
      id: 'whitening',
      name: 'Laser Teeth Whitening',
      urdu: 'دانتوں کی سفیدی',
      icon: 'auto_awesome',
      badge: 'Cosmetic',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      price: 'PKR 18,000',
      duration: '60 mins',
      description: 'Professional in-clinic laser whitening that brightens your smile by up to 6 shades safely and instantly.',
      waText: "Hi DocBot, I'd like to book a Laser Teeth Whitening session."
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Send a message on WhatsApp',
      urdu: 'واٹس ایپ پر میسج بھیجیں',
      desc: 'No apps to install. Simply click the chat button or message us 24/7 at +92 300 1234567.',
      icon: 'chat',
    },
    {
      num: '02',
      title: 'Tell DocBot what you need',
      urdu: 'اپنی ضرورت بتائیں',
      desc: 'Whether it is a routine cleaning, a checkup, or tooth pain, DocBot understands English and Roman Urdu.',
      icon: 'psychology',
    },
    {
      num: '03',
      title: 'Choose your convenient slot',
      urdu: 'مناسب وقت کا انتخاب کریں',
      desc: 'DocBot checks real-time clinic doctor schedules and offers available morning and evening slots.',
      icon: 'event_available',
    },
    {
      num: '04',
      title: 'Get instant confirmation',
      urdu: 'فوری تصدیق حاصل کریں',
      desc: 'Receive your booking pass with Google Maps location pin and friendly appointment reminders.',
      icon: 'verified',
    },
  ];

  const testimonials = [
    {
      name: 'Ayesha Khan',
      city: 'Gulberg III, Lahore',
      role: 'Routine Cleaning Patient',
      stars: 5,
      comment: 'Booking through WhatsApp was amazingly fast! I texted at 11 PM and had my appointment confirmed for the next morning within 30 seconds. Dr. Sarah was extremely gentle.',
    },
    {
      name: 'Tariq Mehmood',
      city: 'DHA Phase 5, Lahore',
      role: 'Root Canal Patient',
      stars: 5,
      comment: 'I had severe tooth pain on a Sunday and DocBot helped me secure the first available slot on Monday. Truly painless procedure and very modern clinic setup.',
    },
    {
      name: 'Zainab Fatima',
      city: 'Model Town, Lahore',
      role: 'Teeth Whitening Patient',
      stars: 5,
      comment: 'No call waiting or receptionist hassle. The automated reminders on WhatsApp ensured I never forgot my follow-up. 10/10 service for BrightSmile!',
    },
  ];

  const faqs = [
    {
      q: 'How does WhatsApp booking work with DocBot?',
      a: 'DocBot is our intelligent clinic assistant on WhatsApp. When you message, it asks a few quick questions about what service you need and your preferred day/time, then instantly reserves your slot in our clinic calendar.',
    },
    {
      q: 'Do I need to download any separate app?',
      a: 'Not at all! Everything happens directly inside WhatsApp on your mobile phone or desktop. There are no forms to fill out or apps to install.',
    },
    {
      q: 'Can I reschedule or cancel my appointment through WhatsApp?',
      a: 'Yes, absolutely. Just reply "Reschedule" or "Cancel" in your WhatsApp chat with DocBot and it will help you pick a new time immediately.',
    },
    {
      q: 'Where is BrightSmile Dental located?',
      a: 'We are conveniently located at Suite 4B, 2nd Floor, MM Alam Road, Gulberg III, Lahore. We have dedicated patient parking available.',
    },
    {
      q: 'What are the clinic consultation hours?',
      a: 'We are open Monday through Saturday from 10:00 AM to 8:00 PM. Emergency WhatsApp assistance is monitored 24/7.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Top Notification Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>DocBot AI Booking is Live 24/7</span>
        <span className="text-white/60">|</span>
        <span className="hidden sm:inline">Lahore Clinic Open Today till 8:00 PM</span>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold ml-1 hover:text-primary-fixed transition-colors"
        >
          Book on WhatsApp &rarr;
        </a>
      </div>

      {/* 1. Nav Bar */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-[#e8e6e5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Clinic Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="material-symbols-outlined text-2xl" data-weight="fill">dentistry</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline-md text-xl sm:text-2xl font-bold text-primary tracking-tight">BrightSmile</span>
                <span className="text-xs bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">DocBot</span>
              </div>
              <p className="font-label-caps text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider">Dental Studio • Lahore</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#services" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Services &amp; Pricing
            </a>
            <a href="#reviews" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Patient Reviews
            </a>
            <a href="#contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Location &amp; Hours
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Understated Staff Login Link */}
            <Link
              to="/dashboard"
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/70 rounded-full border border-outline-variant/60 transition-all flex items-center gap-1.5"
              title="Staff & Doctor Dashboard Access"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              <span>Staff Login</span>
            </Link>

            {/* Primary Nav WhatsApp CTA */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/dashboard"
              className="px-2.5 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface border border-outline-variant/60 rounded-full"
            >
              Staff
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface-variant hover:text-primary rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8e6e5] bg-surface-bright px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface py-2 hover:text-primary"
            >
              How It Works
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface py-2 hover:text-primary"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface py-2 hover:text-primary"
            >
              Patient Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-on-surface py-2 hover:text-primary"
            >
              Location &amp; Hours
            </a>
            <div className="pt-2 border-t border-surface-variant flex flex-col gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#25D366] rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Book on WhatsApp</span>
              </a>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center text-xs font-medium text-on-surface-variant bg-surface-container-high rounded-xl"
              >
                Staff Login &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-surface-container-low/50 via-background to-background">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Left Copy */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                
                {/* Bilingual Trust Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/50 text-xs sm:text-sm font-medium text-on-surface shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-primary">DocBot AI</span>
                  <span className="text-outline">|</span>
                  <span className="text-on-surface-variant font-urdu">واٹس ایپ پر باآسانی اپوائنٹمنٹ بک کریں</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display-lg text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.15]">
                  Painless dental care. <br className="hidden sm:inline" />
                  <span className="text-primary">Book in 60 seconds</span> on WhatsApp.
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body-main">
                  Welcome to <strong className="text-on-surface font-semibold">BrightSmile Dental Studio</strong> in Lahore. No waiting on phone hold or filling out long forms. Chat with <strong className="text-primary font-medium">DocBot</strong> anytime — pick your service, select a time slot, and get confirmed instantly.
                </p>

                {/* CTA Action Area */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base sm:text-lg rounded-2xl shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Chat with us on WhatsApp</span>
                  </a>

                  <a
                    href="#services"
                    className="w-full sm:w-auto px-6 py-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-base rounded-2xl border border-outline-variant/60 transition-all text-center"
                  >
                    View Services &amp; Fees
                  </a>
                </div>

                {/* Real-time Trust indicators */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">schedule</span>
                    <span>Open today until <strong>8:00 PM</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Gulberg III, MM Alam Rd, Lahore</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-lg">star</span>
                    <span><strong>4.9★</strong> (320+ verified reviews)</span>
                  </div>
                </div>

                {/* Note about WhatsApp placeholder */}
                <p className="text-[11px] text-outline font-data-mono italic">
                  * Connecting to clinic WhatsApp: {CLINIC_PHONE_DISPLAY} (DocBot Live Demo)
                </p>
              </div>

              {/* Hero Right Visual: Live WhatsApp Mockup Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
                  
                  {/* WhatsApp App Bar */}
                  <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#075E54] flex items-center justify-center font-bold text-lg">
                          🦷
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-sm leading-tight">BrightSmile DocBot</h3>
                          <span className="material-symbols-outlined text-xs text-sky-300">verified</span>
                        </div>
                        <p className="text-[11px] text-emerald-200 leading-tight">AI Assistant • Online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-100">
                      <span className="material-symbols-outlined text-lg">videocam</span>
                      <span className="material-symbols-outlined text-lg">call</span>
                      <span className="material-symbols-outlined text-lg">more_vert</span>
                    </div>
                  </div>

                  {/* WhatsApp Chat Body */}
                  <div className="bg-[#ECE5DD] p-4 space-y-3.5 text-xs sm:text-sm font-sans min-h-[380px] flex flex-col justify-end bg-[radial-gradient(#dbcbc0_1px,transparent_1px)] [background-size:16px_16px]">
                    
                    {/* Timestamp badge */}
                    <div className="text-center">
                      <span className="bg-white/80 backdrop-blur-xs text-slate-600 text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                        Today
                      </span>
                    </div>

                    {/* Patient Message */}
                    <div className="self-end bg-[#DCF8C6] text-slate-800 rounded-2xl rounded-tr-none px-3.5 py-2.5 max-w-[85%] shadow-xs space-y-1">
                      <p className="leading-relaxed">Hi! I want to book a teeth cleaning appointment for tomorrow afternoon.</p>
                      <div className="text-[10px] text-slate-500 text-right flex items-center justify-end gap-1">
                        <span>4:15 PM</span>
                        <span className="text-sky-600 font-bold">✓✓</span>
                      </div>
                    </div>

                    {/* DocBot Reply */}
                    <div className="self-start bg-white text-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[88%] shadow-xs space-y-2">
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                        <span>DocBot AI</span>
                      </div>
                      <p className="leading-relaxed text-xs">
                        Hello! Welcome to <strong>BrightSmile Dental</strong>. I can book your <strong>Teeth Cleaning &amp; Polishing</strong>.
                      </p>
                      <p className="leading-relaxed text-xs">
                        Here are the available slots for tomorrow (Friday):
                      </p>
                      
                      {/* Interactive Slot Buttons Simulation */}
                      <div className="space-y-1.5 pt-1">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-2 text-xs flex items-center justify-between font-medium cursor-pointer hover:bg-emerald-100 transition-colors">
                          <span>🕒 3:30 PM (Dr. Sarah)</span>
                          <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Available</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-2 text-xs flex items-center justify-between font-medium cursor-pointer hover:bg-emerald-100 transition-colors">
                          <span>🕒 5:00 PM (Dr. Usman)</span>
                          <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Available</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 text-right">
                        <span>4:15 PM</span>
                      </div>
                    </div>

                    {/* Confirmed Confirmation Pill */}
                    <div className="self-center bg-white/95 border border-emerald-300 text-slate-800 text-[11px] rounded-xl px-3 py-2 shadow-sm flex items-center gap-2 max-w-full">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span><strong>Instant Booking:</strong> 1-click confirmation sent on WhatsApp!</span>
                    </div>

                  </div>

                  {/* WhatsApp Quick Input Simulation */}
                  <div className="bg-[#F0F0F0] p-2.5 border-t border-slate-200 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>Type a message...</span>
                      <span className="material-symbols-outlined text-slate-400 text-base">attach_file</span>
                    </div>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
                      title="Send message to DocBot"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                    </a>
                  </div>
                </div>

                {/* Floating Floating Stat Badge */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-surface-container-lowest p-3.5 rounded-2xl shadow-xl border border-outline-variant/50 items-center gap-3 max-w-[210px]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">bolt</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">&lt; 60 Seconds</p>
                    <p className="text-[10px] text-on-surface-variant">Average booking time</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. How DocBot Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-surface-container-lowest border-y border-outline-variant/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                <span>Simple &amp; Fast</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
                How DocBot Works in 4 Simple Steps
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-body-main">
                No passwords, no verification codes, no confusion. Just open WhatsApp and talk to our smart assistant naturally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-surface-container-low hover:bg-surface-container rounded-2xl p-6 border border-outline-variant/40 hover:border-primary/40 transition-all duration-200 hover:-translate-y-1 group relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-data-mono text-sm font-bold text-primary bg-white px-2.5 py-1 rounded-lg border border-primary/20 shadow-xs">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">{step.icon}</span>
                      </div>
                    </div>
                    <h3 className="font-patient-title text-lg font-bold text-on-surface mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-primary font-medium font-urdu mb-2">{step.urdu}</p>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action under steps */}
            <div className="mt-12 text-center">
              <a
                href={getWhatsAppLink("Hi DocBot! I'd like to try booking an appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm rounded-full shadow hover:shadow-md transition-all"
              >
                <span>Try DocBot Now on WhatsApp</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. Services & Pricing Section */}
        <section id="services" className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wider uppercase">
                <span>Our Treatments</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
                Dental Services &amp; Transparent Pricing
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-body-main">
                All procedures are performed by certified dental surgeons with hospital-grade sterilization and modern anesthesia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/50 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-patient-title text-base sm:text-lg font-bold text-on-surface">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-xs text-on-surface-variant font-urdu mt-0.5">{service.urdu}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-variant/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">Starting from</span>
                      <span className="font-headline-md text-base sm:text-lg font-bold text-primary">
                        {service.price}
                      </span>
                    </div>
                    <a
                      href={getWhatsAppLink(service.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                      title={`Book ${service.name} on WhatsApp`}
                    >
                      <span>Book Slot</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing transparency note */}
            <div className="mt-10 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <span className="material-symbols-outlined text-primary text-base">info</span>
                <span>Exact costs may vary depending on clinical examination and customized treatment plans. Prices in PKR.</span>
              </div>
              <a
                href={getWhatsAppLink("Hi DocBot, I'd like to ask about customized treatment plans and pricing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline whitespace-nowrap"
              >
                Inquire on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* 5. Trust & Social Proof Section */}
        <section id="reviews" className="py-16 sm:py-24 bg-surface-container-lowest border-y border-outline-variant/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-14 border-b border-surface-variant text-center">
              <div className="space-y-1">
                <div className="font-headline-md text-2xl sm:text-4xl font-bold text-primary">5,000+</div>
                <div className="text-xs sm:text-sm text-on-surface-variant font-medium">Happy Smiles in Lahore</div>
              </div>
              <div className="space-y-1">
                <div className="font-headline-md text-2xl sm:text-4xl font-bold text-primary">4.9 ★</div>
                <div className="text-xs sm:text-sm text-on-surface-variant font-medium">320+ Google Reviews</div>
              </div>
              <div className="space-y-1">
                <div className="font-headline-md text-2xl sm:text-4xl font-bold text-primary">24 / 7</div>
                <div className="text-xs sm:text-sm text-on-surface-variant font-medium">WhatsApp AI Booking</div>
              </div>
              <div className="space-y-1">
                <div className="font-headline-md text-2xl sm:text-4xl font-bold text-primary">100%</div>
                <div className="text-xs sm:text-sm text-on-surface-variant font-medium">Hospital-Grade Sterilization</div>
              </div>
            </div>

            {/* Testimonials Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mt-14 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase">
                <span>Patient Experiences</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
                Loved by Patients Across Lahore
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-body-main">
                See why hundreds of families trust BrightSmile Dental and our automated WhatsApp booking assistant.
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.stars)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-lg" data-weight="fill">star</span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface italic leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-on-surface leading-tight">{t.name}</h4>
                      <p className="text-[11px] text-on-surface-variant">{t.city} • <span className="text-primary font-medium">{t.role}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[11px] text-outline font-data-mono italic mt-6">
              * Testimonials &amp; stats represent illustrative patient feedback samples for BrightSmile Dental.
            </p>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-10">
              <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Everything you need to know about booking with DocBot.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-outline-variant/50 rounded-xl overflow-hidden bg-surface-container-lowest"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left font-medium text-sm sm:text-base text-on-surface flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-variant/40 bg-surface-container-low/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-primary to-surface-tint text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-display-lg text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready for a healthier, brighter smile?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
              Skip phone calls and long waiting times. Start your WhatsApp conversation with DocBot now.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Book Appointment on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer id="contact" className="bg-[#181c21] text-surface-variant border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
            
            {/* Clinic Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xl" data-weight="fill">dentistry</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg font-bold text-white tracking-tight">BrightSmile Dental</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-label-caps">Studio &amp; Surgery</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern dental healthcare in Lahore powered by DocBot AI WhatsApp booking assistant for instantaneous patient scheduling.
              </p>
              <div className="pt-1">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:underline"
                >
                  <span>Chat on WhatsApp: {CLINIC_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Clinic Timings */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Clinic Hours</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="font-medium text-white">10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium text-white">11:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-amber-400 font-medium">Closed (Emergency Only)</span>
                </li>
                <li className="pt-2 text-[11px] text-slate-400">
                  ⚡ DocBot WhatsApp assistant is active 24/7.
                </li>
              </ul>
            </div>

            {/* Clinic Address & Contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Clinic Location</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">location_on</span>
                  <span>Suite 4B, 2nd Floor, MM Alam Road, Gulberg III, Lahore, Pakistan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">call</span>
                  <span>+92 (42) 3578-1234 / {CLINIC_PHONE_DISPLAY}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">mail</span>
                  <span>hello@brightsmile.pk</span>
                </li>
              </ul>
            </div>

            {/* Quick Links & Staff Access */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How DocBot Works</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Treatments &amp; Pricing</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Patient Testimonials</a></li>
                <li className="pt-3 border-t border-slate-700/60">
                  {/* Understated Staff Login in Footer */}
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">login</span>
                    <span>Staff Dashboard Portal &rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} BrightSmile Dental Studio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Powered by DocBot WhatsApp AI</span>
              <span>•</span>
              <Link to="/dashboard" className="hover:text-slate-300 transition-colors">
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
