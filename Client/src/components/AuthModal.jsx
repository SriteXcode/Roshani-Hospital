import React, { useState, useEffect } from 'react';
import { X, Phone, Lock, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(30);
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234' && otp.length !== 4) {
      setError('Invalid OTP. Use demo OTP: 1234');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = { phone: `+91 ${phone}`, isLoggedIn: true };
      localStorage.setItem('roshni_user', JSON.stringify(user));
      onLoginSuccess(user);
      resetModal();
    }, 800);
  };

  const resetModal = () => {
    setStep(1);
    setPhone('');
    setOtp('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={resetModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-xl font-extrabold text-navy">
            <ShieldCheck size={22} className="text-teal" />
            <h3>{t('auth.modalTitle')}</h3>
          </div>
          <button
            onClick={resetModal}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl mb-4 border border-red-200">
            {error}
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Phone Number Input */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                {t('auth.enterPhone')} *
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <span className="text-navy font-bold text-sm mr-2 text-slate-500">+91</span>
                <input
                  type="tel"
                  maxLength="10"
                  placeholder={t('auth.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent border-none outline-none text-navy text-sm font-semibold placeholder-slate-400"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                An OTP will be sent to your mobile number for instant verification.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-teal py-3 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <span>{t('auth.sendingOtp')}</span>
              ) : (
                <>
                  <span>{t('auth.sendOtp')}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-teal-soft/60 border border-teal-100 rounded-2xl p-3.5 text-xs text-navy flex items-center justify-between">
              <div>
                <span className="text-slate-500 block">{t('auth.otpSentMsg')}</span>
                <strong className="text-navy font-bold">+91 {phone}</strong>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-teal font-bold hover:underline"
              >
                {t('auth.editPhone')}
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-navy">
                  {t('auth.enterOtp')} *
                </label>
                <span className="text-[11px] text-teal-dark font-bold bg-teal-soft px-2 py-0.5 rounded-md">
                  {t('auth.demoOtpHint')}
                </span>
              </div>

              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all">
                <Lock size={18} className="text-teal mr-2 shrink-0" />
                <input
                  type="text"
                  maxLength="4"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-navy text-base font-extrabold tracking-widest placeholder-slate-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              {countdown > 0 ? (
                <span>{t('auth.resendIn', { seconds: countdown })}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCountdown(30);
                    setError('');
                  }}
                  className="text-teal font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw size={12} /> {t('auth.resendOtp')}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-teal py-3 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <span>{t('auth.verifying')}</span>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>{t('auth.verifyLogin')}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
