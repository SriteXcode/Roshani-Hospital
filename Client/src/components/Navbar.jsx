import React from 'react';
import { Calendar, PhoneCall, Globe, MapPin, User, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

const Navbar = ({ onOpenBooking, onGoHome, user, onOpenAuth, onOpenProfile }) => {
  const { language, toggleLanguage, t } = useLanguage();

  const handleHomeClick = (e) => {
    if (onGoHome) {
      onGoHome();
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Thin Utility Strip */}
      <div className="bg-navy-dark text-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 border-b border-navy-light/30 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Info: 24/7 Hospital Helpline & Address */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:1234567890"
              className="flex items-center gap-1.5 text-teal-light font-semibold hover:underline"
            >
              <PhoneCall size={13} className="text-teal-light shrink-0" />
              <span>{t('nav.helpline')} +91 1234567890</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=RoshniHospitality+Hospital+108+Healthcare+Blvd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-teal-light transition-colors group cursor-pointer"
              title="Get Google Maps Directions / दिशा-निर्देश प्राप्त करें"
            >
              <MapPin size={13} className="text-teal group-hover:scale-110 transition-transform shrink-0" />
              <span>{t('footer.address')}</span>
            </a>
          </div>

          {/* Right Controls: 24/7 OPD Status & Language Switcher */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
              24/7 OPD & Emergency Medicine
            </span>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-navy-light/60 hover:bg-navy-light text-white font-bold text-[11px] px-3 py-1 rounded-md transition-all border border-navy-light cursor-pointer shadow-xs"
              title="Switch Language / भाषा बदलें"
            >
              <Globe size={13} className="text-teal-light" />
              <span>{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-teal-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" onClick={handleHomeClick} className="flex items-center gap-3 text-2xl font-extrabold text-navy hover:opacity-90 transition-opacity">
            <img src={logoImg} alt="RoshniHospitality Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
            <span className="tracking-tight">{t('nav.brand')}</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-[15px]">{t('nav.home')}</a>
            <a href="#departments" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-[15px]">{t('nav.departments')}</a>
            <a href="#doctors" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-[15px]">{t('nav.doctors')}</a>
            <a href="#services" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-[15px]">{t('nav.services')}</a>
            <a href="#contact" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-[15px]">{t('nav.contact')}</a>
          </nav>

          {/* Right Action Container: Book Appointment (Left) & Login / Profile (Right) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Book Appointment CTA on Left */}
            <button
              onClick={onOpenBooking}
              className="btn-teal flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer shadow-sm shrink-0"
            >
              <Calendar size={16} className="shrink-0" />
              <span>{t('nav.bookAppointment')}</span>
            </button>

            {/* Login / Signup CTA (transforms into Profile after login) on Right */}
            {user && user.isLoggedIn ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm border-2 border-teal text-teal bg-teal-light/10 hover:bg-teal-light/20 transition-all cursor-pointer shadow-xs"
                title={user.phone}
              >
                <UserCheck size={16} className="shrink-0 text-teal" />
                <span className="max-w-[120px] truncate font-bold">{t('auth.myAccount')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm border border-navy/20 text-navy hover:border-teal hover:text-teal transition-all cursor-pointer shadow-xs"
              >
                <User size={16} className="shrink-0" />
                <span>{t('auth.loginSignup')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
