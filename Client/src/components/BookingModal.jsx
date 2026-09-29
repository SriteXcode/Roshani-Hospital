import { useState } from 'react';
import { X, Calendar, User, Phone, Mail, Stethoscope, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BookingModal = ({ isOpen, onClose, selectedDoctor, doctors }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    doctorId: selectedDoctor ? selectedDoctor._id : '',
    appointmentDate: '',
    timeSlot: '09:00 AM - 10:00 AM',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-navy">
            <Calendar className="text-teal" size={20} />
            <h3>{t('bookingModal.title')}</h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 sm:py-8">
            <CheckCircle size={56} className="text-teal mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-navy">{t('bookingModal.successTitle')}</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              {t('bookingModal.successMsg', {
                guestName: formData.guestName,
                appointmentDate: formData.appointmentDate,
              })}
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 btn-teal px-8 py-3 rounded-xl font-semibold cursor-pointer w-full sm:w-auto"
            >
              {t('bookingModal.doneBtn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                <User size={13} className="text-teal" /> {t('bookingModal.fullName')}
              </label>
              <input
                type="text"
                name="guestName"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                placeholder={t('bookingModal.namePlaceholder')}
                required
                value={formData.guestName}
                onChange={handleChange}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                  <Mail size={13} className="text-teal" /> {t('bookingModal.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder={t('bookingModal.emailPlaceholder')}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                  <Phone size={13} className="text-teal" /> {t('bookingModal.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder={t('bookingModal.phonePlaceholder')}
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Select Doctor */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                <Stethoscope size={13} className="text-teal" /> {t('bookingModal.selectDoctor')}
              </label>
              <select
                name="doctorId"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                value={formData.doctorId}
                onChange={handleChange}
              >
                <option value="">{t('bookingModal.selectDefault')}</option>
                {doctors &&
                  doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} ({doc.specialty})
                    </option>
                  ))}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                  <Calendar size={13} className="text-teal" /> {t('bookingModal.prefDate')}
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  required
                  value={formData.appointmentDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-navy mb-1">
                  <Clock size={13} className="text-teal" /> {t('bookingModal.timeSlot')}
                </label>
                <select
                  name="timeSlot"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1">{t('bookingModal.reason')}</label>
              <textarea
                name="reason"
                rows="2"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy text-xs sm:text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                placeholder={t('bookingModal.reasonPlaceholder')}
                value={formData.reason}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-teal py-3 rounded-xl font-bold text-sm cursor-pointer mt-2"
            >
              {loading ? t('bookingModal.submittingBtn') : t('bookingModal.submitBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
