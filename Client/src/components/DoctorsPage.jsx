import React, { useState } from 'react';
import {
  Search,
  Star,
  Clock,
  Calendar,
  Filter,
  ArrowLeft,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const allMockDoctors = [
  {
    _id: '1',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiology Specialist',
    qualifications: 'MBBS, MD (Cardiology)',
    experience: '14+ Years Exp',
    rating: 4.9,
    dept: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '2',
    name: 'Dr. Vikramaditya Roy',
    specialty: 'Senior Neurologist',
    qualifications: 'MBBS, DM (Neurology)',
    experience: '16+ Years Exp',
    rating: 4.95,
    dept: 'Neurology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '3',
    name: 'Dr. Meera Patel',
    specialty: 'Pediatric Specialist',
    qualifications: 'MBBS, DCH (Pediatrics)',
    experience: '10+ Years Exp',
    rating: 4.88,
    dept: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1594824813566-8185b378f79f?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '4',
    name: 'Dr. Rajesh Khanna',
    specialty: 'Orthopedic Surgeon',
    qualifications: 'MBBS, MS (Orthopedics)',
    experience: '18+ Years Exp',
    rating: 4.92,
    dept: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '5',
    name: 'Dr. Sunita Deshmukh',
    specialty: 'Senior Surgical Oncologist',
    qualifications: 'MBBS, MS, MCh (Oncology)',
    experience: '15+ Years Exp',
    rating: 4.91,
    dept: 'Oncology',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '6',
    name: 'Dr. Amitav Mukherji',
    specialty: 'Emergency Medicine & Trauma Specialist',
    qualifications: 'MBBS, MD (Emergency Medicine)',
    experience: '12+ Years Exp',
    rating: 4.89,
    dept: 'Emergency',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '7',
    name: 'Dr. Priyanka Verma',
    specialty: 'Consultant Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    experience: '9+ Years Exp',
    rating: 4.86,
    dept: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1594824813566-8185b378f79f?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '8',
    name: 'Dr. Harshvardhan Joshi',
    specialty: 'Senior Gastroenterologist',
    qualifications: 'MBBS, DM (Gastroenterology)',
    experience: '20+ Years Exp',
    rating: 4.97,
    dept: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  },
];

const DoctorsPage = ({ onBack, onOpenBooking }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const departmentsList = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology', 'Emergency', 'Dermatology', 'Gastroenterology'];

  const filteredDoctors = allMockDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.dept === selectedDept;
    const matchesRating = doc.rating >= minRating;
    return matchesSearch && matchesDept && matchesRating;
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

      {/* Combined Header Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-teal-100 shadow-sm mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Title & Description */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark font-semibold text-xs mb-2.5 border border-teal-100">
            <UserCheck size={13} className="text-teal" />
            <span>Expert Medical Faculty</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-2">
            {t('doctors.sectionTitle')}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {t('doctors.sectionSubtitle')}
          </p>
        </div>

        {/* Right Column: Search Bar & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 lg:justify-end shrink-0 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all text-xs sm:text-sm shadow-xs flex-1 sm:flex-initial">
            <Search size={16} className="text-teal mr-2 shrink-0" />
            <input
              type="text"
              placeholder={t('doctors.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-44 md:w-52 bg-transparent border-none outline-none text-navy font-medium placeholder-slate-400 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Rating Filter Dropdown */}
            <div className="flex-1 sm:flex-initial flex items-center justify-between bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-3 py-2 sm:py-2.5 text-xs shadow-xs">
              <div className="flex items-center">
                <Star size={14} className="text-amber-500 fill-amber-500 mr-1.5 shrink-0" />
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-transparent text-navy text-xs font-bold border-none outline-none cursor-pointer pr-1"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4.9}>4.9+ Top</option>
                  <option value={4.85}>4.85+ Good</option>
                </select>
              </div>
            </div>

            {/* Department Filter Dropdown */}
            <div className="flex-1 sm:flex-initial flex items-center justify-between bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-3 py-2 sm:py-2.5 text-xs shadow-xs">
              <div className="flex items-center">
                <Filter size={14} className="text-teal mr-1.5 shrink-0" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-transparent text-navy text-xs font-bold border-none outline-none cursor-pointer pr-1"
                >
                  {departmentsList.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? t('doctors.filterAll') : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-sm">
          <p className="text-slate-500 font-semibold text-sm sm:text-base mb-4">{t('doctors.noResults')}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDept('All');
              setMinRating(0);
            }}
            className="btn-teal px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-teal/40 transition-all group"
            >
              {/* Arched Top Image Container */}
              <div className="w-full h-48 sm:h-56 rounded-t-[80px] sm:rounded-t-[100px] rounded-b-2xl overflow-hidden border border-teal-100 bg-gradient-to-b from-teal-light/20 to-teal/10 mb-4">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-teal-dark bg-teal-soft px-2.5 py-1 rounded-md inline-block mb-2">
                    {doc.dept}
                  </span>
                  <h3 className="text-base font-bold text-navy leading-tight mb-1">{doc.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{doc.qualifications}</p>

                  <div className="flex items-center justify-between text-xs text-slate-600 mb-4 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock size={12} className="text-slate-400 shrink-0" /> {doc.experience}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                      <Star size={12} className="fill-amber-500 text-amber-500 shrink-0" /> {doc.rating}
                    </span>
                  </div>
                </div>

                {/* Green Action Button */}
                <button
                  onClick={() => onOpenBooking(doc)}
                  className="w-full btn-teal py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar size={14} />
                  <span>{t('doctors.bookSlot')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
