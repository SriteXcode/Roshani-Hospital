import React from 'react';
import { X, UserCheck, ShieldCheck, LogOut, Phone, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-navy">
            <UserCheck size={20} className="text-teal" />
            <h3>{t('auth.profileTitle')}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-6 space-y-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-light/20 flex items-center justify-center text-teal font-extrabold text-lg sm:text-xl shadow-inner shrink-0">
              <UserCheck size={24} />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 mb-1">
                <ShieldCheck size={12} />
                {t('auth.verifiedStatus')}
              </span>
              <p className="text-base sm:text-lg font-bold text-navy flex items-center gap-1.5 truncate">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              {t('auth.profileNotice')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-xs sm:text-sm cursor-pointer text-center"
          >
            {t('nav.backHome')}
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer border border-red-200"
          >
            <LogOut size={15} />
            <span>{t('auth.logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
