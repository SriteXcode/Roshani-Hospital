import { useState } from 'react';
import { Calendar, PhoneCall, Globe, MapPin, User, UserCheck, Menu, X, Clock, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

const Navbar = ({ onOpenBooking, onGoHome, user, onOpenAuth, onOpenProfile }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (hash) => {
    if (onGoHome) {
      onGoHome();
    }
    setIsMobileMenuOpen(false);
    // Smooth scroll to target if on home page
    const elem = document.querySelector(hash);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const handleAuthClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenAuth) {
      onOpenAuth();
    }
  };

  const handleProfileClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenProfile) {
      onOpenProfile();
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Thin Utility Strip */}
      <div className="bg-navy-dark text-slate-200 py-1.5 px-3 sm:px-6 lg:px-8 border-b border-navy-light/30 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Info: 24/7 Hospital Helpline & Address */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <a
              href="tel:1234567890"
              className="flex items-center gap-1.5 text-teal-light font-semibold hover:underline truncate"
            >
              <PhoneCall size={13} className="text-teal-light shrink-0" />
              <span className="hidden xs:inline">{t('nav.helpline')}</span>
              <span>+91 1234567890</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=RoshniHospitality+Hospital+108+Healthcare+Blvd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-teal-light transition-colors group cursor-pointer"
              title="Get Google Maps Directions / दिशा-निर्देश प्राप्त करें"
            >
              <MapPin size={13} className="text-teal group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate max-w-xs">{t('footer.address')}</span>
            </a>
          </div>

          {/* Right Controls: 24/7 OPD Status & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 font-medium text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
              24/7 OPD & Emergency
            </span>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-navy-light/60 hover:bg-navy-light text-white font-bold text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-md transition-all border border-navy-light cursor-pointer shadow-xs"
              title="Switch Language / भाषा बदलें"
            >
              <Globe size={12} className="text-teal-light" />
              <span>{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-teal-100 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={handleHomeClick}
            className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-extrabold text-navy hover:opacity-90 transition-opacity shrink-0"
          >
            <img src={logoImg} alt="RoshniHospitality Logo" className="w-12 h-12 object-contain drop-shadow-sm" />
            <span className="tracking-tight">{t('nav.brand')}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#home" onClick={handleHomeClick} className="font-semibold text-navy hover:text-teal transition-colors text-sm xl:text-[15px]">{t('nav.home')}</a>
            <a href="#departments" onClick={() => handleNavClick('#departments')} className="font-semibold text-navy hover:text-teal transition-colors text-sm xl:text-[15px]">{t('nav.departments')}</a>
            <a href="#doctors" onClick={() => handleNavClick('#doctors')} className="font-semibold text-navy hover:text-teal transition-colors text-sm xl:text-[15px]">{t('nav.doctors')}</a>
            <a href="#services" onClick={() => handleNavClick('#services')} className="font-semibold text-navy hover:text-teal transition-colors text-sm xl:text-[15px]">{t('nav.services')}</a>
            <a href="#contact" onClick={() => handleNavClick('#contact')} className="font-semibold text-navy hover:text-teal transition-colors text-sm xl:text-[15px]">{t('nav.contact')}</a>
          </nav>

          {/* Right Action Container: Book Appointment & User Auth / Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Book Appointment CTA */}
            <button
              onClick={handleBookingClick}
              className="btn-teal flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer shadow-sm shrink-0"
            >
              <Calendar size={15} className="shrink-0" />
              <span className="hidden xs:inline sm:hidden">Book</span>
              <span className="hidden sm:inline">{t('nav.bookAppointment')}</span>
              <span className="xs:hidden">Book</span>
            </button>

            {/* Login / Signup CTA (Desktop / Tablet) */}
            <div className="hidden sm:block">
              {user && user.isLoggedIn ? (
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm border-2 border-teal text-teal bg-teal-light/10 hover:bg-teal-light/20 transition-all cursor-pointer shadow-xs"
                  title={user.phone}
                >
                  <UserCheck size={16} className="shrink-0 text-teal" />
                  <span className="max-w-[100px] sm:max-w-[120px] truncate font-bold">{t('auth.myAccount')}</span>
                </button>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm border border-navy/20 text-navy hover:border-teal hover:text-teal transition-all cursor-pointer shadow-xs"
                >
                  <User size={16} className="shrink-0" />
                  <span>{t('auth.loginSignup')}</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-navy hover:text-teal hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-100 shadow-xl transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3 max-w-7xl mx-auto">
            {/* User Profile / Login Card on Mobile */}
            <div className="p-3 rounded-2xl bg-teal-soft/50 border border-teal-100">
              {user && user.isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">{user.phone}</p>
                      <span className="text-[10px] text-teal font-semibold">Active Patient Profile</span>
                    </div>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="btn-teal px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
                    {t('auth.myAccount')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-navy">Welcome, Patient</p>
                    <span className="text-[10px] text-slate-500">Sign in to view your records</span>
                  </div>
                  <button
                    onClick={handleAuthClick}
                    className="btn-navy-outline bg-white px-3.5 py-1.5 rounded-lg text-xs font-bold"
                  >
                    {t('auth.loginSignup')}
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1 pt-1">
              <a
                href="#home"
                onClick={handleHomeClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-navy hover:bg-teal-soft hover:text-teal transition-colors"
              >
                <span>{t('nav.home')}</span>
              </a>
              <a
                href="#departments"
                onClick={() => handleNavClick('#departments')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-navy hover:bg-teal-soft hover:text-teal transition-colors"
              >
                <span>{t('nav.departments')}</span>
              </a>
              <a
                href="#doctors"
                onClick={() => handleNavClick('#doctors')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-navy hover:bg-teal-soft hover:text-teal transition-colors"
              >
                <span>{t('nav.doctors')}</span>
              </a>
              <a
                href="#services"
                onClick={() => handleNavClick('#services')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-navy hover:bg-teal-soft hover:text-teal transition-colors"
              >
                <span>{t('nav.services')}</span>
              </a>
              <a
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-navy hover:bg-teal-soft hover:text-teal transition-colors"
              >
                <span>{t('nav.contact')}</span>
              </a>
            </nav>

            {/* Quick Mobile Info Links */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-xs">
              <a
                href="tel:1234567890"
                className="flex items-center gap-2 text-navy font-semibold p-2 rounded-xl bg-slate-50 hover:bg-teal-soft transition-colors"
              >
                <PhoneCall size={14} className="text-teal" />
                <span>{t('nav.helpline')}: +91 1234567890</span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=RoshniHospitality+Hospital+108+Healthcare+Blvd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 font-medium p-2 rounded-xl bg-slate-50 hover:bg-teal-soft transition-colors"
              >
                <MapPin size={14} className="text-teal" />
                <span className="truncate">{t('footer.address')}</span>
              </a>
              <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-teal" /> 24/7 OPD & Emergency
                </span>
                <span className="flex items-center gap-1.5 text-teal font-semibold">
                  <ShieldAlert size={12} /> Level 1 Trauma
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
