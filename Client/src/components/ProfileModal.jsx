import React from 'react';
import { X, UserCheck, ShieldCheck, LogOut, Phone, Calendar, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-xl font-extrabold text-navy">
            <UserCheck size={22} className="text-teal" />
            <h3>{t('auth.profileTitle')}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-light/20 flex items-center justify-center text-teal font-extrabold text-xl shadow-inner">
              <UserCheck size={28} />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1">
                <ShieldCheck size={13} />
                {t('auth.verifiedStatus')}
              </span>
              <p className="text-lg font-bold text-navy flex items-center gap-2">
                <Phone size={16} className="text-slate-400" />
                {user.phone}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              {t('auth.profileNotice')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-sm cursor-pointer"
          >
            {t('nav.backHome')}
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer border border-red-200"
          >
            <LogOut size={16} />
            <span>{t('auth.logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
