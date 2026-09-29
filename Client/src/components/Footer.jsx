import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-dark text-slate-300 pt-12 sm:pt-16 pb-8 border-t border-navy-light/40" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 text-xl sm:text-2xl font-extrabold text-white mb-3 sm:mb-4">
              <img src={logoImg} alt="RoshniHospitality Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain brightness-125" />
              <span>{t('nav.brand')}</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#home" className="hover:text-teal-light transition-colors">{t('nav.home')}</a></li>
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('nav.departments')}</a></li>
              <li><a href="#doctors" className="hover:text-teal-light transition-colors">{t('nav.doctors')}</a></li>
              <li><a href="#services" className="hover:text-teal-light transition-colors">{t('nav.services')}</a></li>
              <li><a href="#contact" className="hover:text-teal-light transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.specialties')}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('departments.cardiology.title')}</a></li>
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('departments.neurology.title')}</a></li>
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('departments.pediatrics.title')}</a></li>
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('departments.orthopedics.title')}</a></li>
              <li><a href="#departments" className="hover:text-teal-light transition-colors">{t('departments.oncology.title')}</a></li>
            </ul>
          </div>

          {/* Hospital Contact */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=RoshniHospitality+Hospital+108+Healthcare+Blvd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 sm:gap-3 text-slate-400 hover:text-teal-light transition-colors group cursor-pointer"
                  title="Get Google Maps Directions / दिशा-निर्देश प्राप्त करें"
                >
                  <MapPin size={16} className="text-teal shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-snug">{t('footer.address')}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Phone size={16} className="text-teal shrink-0" />
                <span>{t('footer.helpline')}</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Mail size={16} className="text-teal shrink-0" />
                <span>{t('footer.email')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            {t('footer.builtWith')} <Heart size={14} className="text-teal fill-teal" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
