import React, { useState } from 'react';
import {
  Search,
  Heart,
  Brain,
  Baby,
  Bone,
  Activity,
  ShieldAlert,
  ArrowLeft,
  Building2,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const allDepartmentData = [
  {
    id: 'cardiology',
    titleKey: 'departments.cardiology.title',
    descKey: 'departments.cardiology.desc',
    icon: <Heart size={28} />,
    facilities: ['24/7 Cardiac ICU & Cath Lab', 'ECG, Echocardiography & TMT', 'Primary Angioplasty & Stenting', 'Pacemaker Implantation'],
    head: 'Dr. Ananya Sharma (MD, Cardiology)',
  },
  {
    id: 'neurology',
    titleKey: 'departments.neurology.title',
    descKey: 'departments.neurology.desc',
    icon: <Brain size={28} />,
    facilities: ['Stroke ICU & Thrombolysis', 'EEG & EMG Neuro diagnostics', 'Brain & Spine Micro Surgery', 'Epilepsy & Parkinson Care'],
    head: 'Dr. Vikramaditya Roy (DM, Neurology)',
  },
  {
    id: 'pediatrics',
    titleKey: 'departments.pediatrics.title',
    descKey: 'departments.pediatrics.desc',
    icon: <Baby size={28} />,
    facilities: ['Level-3 NICU & PICU Ventilators', 'Immunization & Vaccination Center', 'Pediatric Emergency Surgery', 'Child Growth & Nutrition Clinic'],
    head: 'Dr. Meera Patel (DCH, Pediatrics)',
  },
  {
    id: 'orthopedics',
    titleKey: 'departments.orthopedics.title',
    descKey: 'departments.orthopedics.desc',
    icon: <Bone size={28} />,
    facilities: ['Computer-Navigated Joint Replacement', 'Arthroscopic Knee & Shoulder Surgery', 'Complex Trauma & Fracture Care', 'Sports Injury Rehabilitation'],
    head: 'Dr. Rajesh Khanna (MS, Orthopedics)',
  },
  {
    id: 'oncology',
    titleKey: 'departments.oncology.title',
    descKey: 'departments.oncology.desc',
    icon: <Activity size={28} />,
    facilities: ['Daycare Chemotherapy Unit', 'Targeted Radiation Therapy', 'Tumor Board Tumor Resection', 'Palliative & Pain Management'],
    head: 'Dr. Sunita Deshmukh (MCh, Oncology)',
  },
  {
    id: 'emergency',
    titleKey: 'departments.emergency.title',
    descKey: 'departments.emergency.desc',
    icon: <ShieldAlert size={28} />,
    facilities: ['Level-1 Trauma & Resuscitation Bay', 'Cardiac ACLS Ambulances', '24/7 Blood Bank & Operation Theater', 'Poison & Burn Management Unit'],
    head: 'Dr. Amitav Mukherji (MD, Emergency Medicine)',
  },
];

const DepartmentsPage = ({ onBack, onOpenBooking }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = allDepartmentData.filter((dept) => {
    const title = t(dept.titleKey).toLowerCase();
    const desc = t(dept.descKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  return (
    <div className="min-h-screen bg-mint-bg py-6 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-navy hover:text-teal bg-white px-3.5 py-2 rounded-xl border border-teal-100 shadow-xs cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{t('nav.backHome') || 'Back to Home'}</span>
        </button>
      </div>

      {/* Main Title Banner with Search Bar */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-teal-100 shadow-sm mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-soft text-teal-dark font-semibold text-xs px-3.5 py-1 rounded-full border border-teal-100 mb-2.5">
            <Building2 size={14} className="text-teal" /> Specialized Clinical Units
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-2">
            {t('departments.sectionTitle')}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {t('departments.sectionSubtitle')}
          </p>
        </div>

        {/* Search Input for Departments */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-3.5 py-2.5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all text-xs sm:text-sm shadow-xs">
            <Search size={16} className="text-teal mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-navy font-medium placeholder-slate-400 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      {filteredDepts.length === 0 ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-sm mb-12">
          <p className="text-slate-500 font-semibold text-sm sm:text-base mb-4">No departments found matching your search.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="btn-teal px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm hover:shadow-xl hover:border-teal/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-teal-soft to-teal-100 text-teal-dark flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal group-hover:text-white transition-colors">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-navy">{t(dept.titleKey)}</h3>
                    <span className="text-xs text-slate-500 font-medium block">Head: {dept.head}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{t(dept.descKey)}</p>

                {/* Key Facilities List */}
                <div className="bg-teal-soft/40 border border-teal-100/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                  <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 sm:mb-2.5">Key Facilities & Services:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    {dept.facilities.map((fac, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-teal shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenBooking()}
                  className="btn-teal px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer text-center"
                >
                  Book Appointment
                </button>
                <a
                  href="tel:1234567890"
                  className="flex items-center justify-center gap-1.5 text-xs font-bold text-navy hover:text-teal transition-colors py-1 sm:py-0"
                >
                  <PhoneCall size={14} className="text-teal shrink-0" />
                  <span>Call Department</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
