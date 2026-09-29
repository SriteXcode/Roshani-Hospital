import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import DoctorsPage from './components/DoctorsPage';
import DepartmentsPage from './components/DepartmentsPage';
import { useLanguage } from './context/LanguageContext';
import {
  Calendar,
  Search,
  Heart,
  Brain,
  Baby,
  Bone,
  Activity,
  ShieldAlert,
  Star,
  Clock,
  Award,
  PhoneCall,
  UserCheck,
  Stethoscope,
  Building2,
  User,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Microscope,
  CreditCard,
  CheckCircle2,
  Filter,
} from 'lucide-react';

const mockDoctors = [
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
];

const mockDepartmentIcons = {
  cardiology: <Heart size={26} />,
  neurology: <Brain size={26} />,
  pediatrics: <Baby size={26} />,
  orthopedics: <Bone size={26} />,
  oncology: <Activity size={26} />,
  emergency: <ShieldAlert size={26} />,
};

const departmentKeys = ['cardiology', 'neurology', 'pediatrics', 'orthopedics', 'oncology', 'emergency'];

function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'all-doctors' | 'all-departments'
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' | 'departments'
  const [deptFilter, setDeptFilter] = useState('All');
  const [scheduleFilter, setScheduleFilter] = useState('today_available'); // 'today_available' | 'top_doctors' | 'emergency' | 'all'

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('roshni_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('roshni_user');
    setUser(null);
    setIsProfileOpen(false);
  };

  const handleOpenBooking = (doctor = null) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedDoctor(null);
  };

  const filteredDoctors = mockDoctors
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.dept.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All' || doc.dept === deptFilter;
      const matchesSchedule =
        scheduleFilter === 'all' ||
        scheduleFilter === 'today_available' ||
        (scheduleFilter === 'top_doctors' ? doc.rating >= 4.9 : true) ||
        (scheduleFilter === 'emergency' ? doc.dept === 'Cardiology' || doc.dept === 'Neurology' : true);
      return matchesSearch && matchesDept && matchesSchedule;
    })
    .sort((a, b) => {
      if (scheduleFilter === 'top_doctors') {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-mint-bg flex flex-col font-sans" id="home">
      {/* 1. Header / Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onGoHome={() => setCurrentView('home')}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setCurrentView('profile')}
      />

      {/* View Router Handling */}
      {currentView === 'all-doctors' ? (
        <DoctorsPage onBack={() => setCurrentView('home')} onOpenBooking={handleOpenBooking} />
      ) : currentView === 'all-departments' ? (
        <DepartmentsPage onBack={() => setCurrentView('home')} onOpenBooking={handleOpenBooking} />
      ) : currentView === 'profile' ? (
        <ProfilePage user={user} onLogout={handleLogout} onBack={() => setCurrentView('home')} />
      ) : (
        <>
          {/* 2. Hero Section (60vh Height) */}
          <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center lg:min-h-[60vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
              {/* Left Hero Box */}
              <div className="bg-gradient-to-br from-white via-white to-teal-soft/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm border border-teal-100/80 relative overflow-hidden">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-snug mb-4">
                    {t('hero.title')}
                  </h1>

                  <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                </div>

                {/* Action Pill Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-auto">
                  <button
                    onClick={() => handleOpenBooking()}
                    className="btn-teal px-6 py-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Calendar size={16} />
                    <span>{t('hero.bookBtn')}</span>
                  </button>

                  <button
                    onClick={() => setCurrentView('all-doctors')}
                    className="btn-navy-outline px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Search size={16} />
                    <span>{t('hero.findDoctorBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Right Hero Visual Box */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 flex items-center justify-center relative overflow-hidden shadow-sm border border-teal-100 min-h-[300px] lg:min-h-full">
                <div className="relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden border border-teal-100 bg-gradient-to-tr from-teal/20 via-mint-bg to-white flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                    alt="RoshniHospitality Doctor"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  {/* Floating Stat Badges */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                    <div>
                      <strong className="block text-[11px] font-bold text-navy">{t('hero.rating')}</strong>
                      <span className="text-[10px] text-slate-500">{t('hero.patients')}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                    <UserCheck size={18} className="text-teal" />
                    <div>
                      <strong className="block text-[11px] font-bold text-navy">{t('hero.specialists')}</strong>
                      <span className="text-[10px] text-slate-500">{t('hero.available24h')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Solid Dark Navy Full-Width Banner */}
          <div className="w-full bg-navy-dark h-14 my-4 flex items-center justify-center border-y border-navy-light/30 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-around w-full text-white text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2 text-teal-light">
                <ShieldAlert size={16} /> 24/7 Emergency Medicine & Trauma Care
              </span>
              <span className="hidden md:flex items-center gap-2 text-slate-300">
                <Clock size={16} /> Instant Online Booking & Slot Confirmation
              </span>
              <span className="hidden sm:flex items-center gap-2 text-teal-light">
                <Award size={16} /> Board-Certified Senior Medical Specialists
              </span>
            </div>
          </div>

          {/* 4. Tabbed Filter Switcher */}
          <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex p-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md gap-2">
                {/* Find Doctor Tab */}
                <button
                  onClick={() => setActiveTab('doctors')}
                  className={`flex items-center gap-2.5 px-7 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    activeTab === 'doctors'
                      ? 'bg-teal text-white shadow-md scale-105'
                      : 'text-navy hover:text-teal hover:bg-slate-50'
                  }`}
                >
                  <User size={16} />
                  <span>{t('tabs.findDoctor')}</span>
                </button>

                {/* Find Department Tab */}
                <button
                  onClick={() => setActiveTab('departments')}
                  className={`flex items-center gap-2.5 px-7 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    activeTab === 'departments'
                      ? 'bg-teal text-white shadow-md scale-105'
                      : 'text-navy hover:text-teal hover:bg-slate-50'
                  }`}
                >
                  <Building2 size={16} />
                  <span>{t('tabs.findDepartment')}</span>
                </button>
              </div>
            </div>

            {/* 5. Doctor Showcase Container */}
            {(activeTab === 'doctors' || activeTab === 'all') && (
              <div className="bg-teal-soft/60 border border-teal-100/90 rounded-[32px] p-6 sm:p-10 mb-12 shadow-sm" id="doctors">
                {/* Section Header & 2-Row Control Box */}
                <div className="mb-8 space-y-4">
                  {/* Top Row: Section Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <span className="bg-white text-navy border border-teal-100 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                      <Calendar size={15} className="text-teal" />
                      <span>{t('tabs.todaysAvailable')}</span>
                    </span>
                  </div>

                  {/* Search Bar (Row 1) & Filters (Row 2) Container */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100/90 shadow-sm space-y-3">
                    {/* Row 1: Full-Width Search Bar */}
                    <div className="w-full flex items-center bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-2.5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20 transition-all text-xs">
                      <Search size={16} className="text-teal mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder={t('doctors.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-navy text-xs font-medium placeholder-slate-400"
                      />
                    </div>

                    {/* Row 2: Filters Below in Another Row (Aligned Right) */}
                    <div className="flex items-center justify-end gap-3 flex-wrap pt-2 border-t border-slate-100">
                      <div className="inline-flex items-center bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-1.5 shadow-xs text-xs font-bold text-navy hover:border-teal transition-all gap-2">
                        {/* Today's Schedule Filter */}
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                          <Clock size={13} className="text-teal shrink-0" />
                          <select
                            value={scheduleFilter}
                            onChange={(e) => setScheduleFilter(e.target.value)}
                            className="bg-transparent text-navy font-bold border-none outline-none cursor-pointer text-xs pr-0.5"
                          >
                            <option value="today_available">{t('schedule.todayAvailable')}</option>
                            <option value="top_doctors">{t('schedule.topDoctors')}</option>
                            <option value="emergency">{t('schedule.emergencyDuty')}</option>
                            <option value="all">{t('schedule.allDoctors')}</option>
                          </select>
                          <ChevronDown size={13} className="text-slate-400 pointer-events-none" />
                        </div>

                        <span className="text-slate-300 font-normal">|</span>

                        {/* Department Filter */}
                        <div className="flex items-center gap-1.5">
                          <Filter size={13} className="text-teal shrink-0" />
                          <select
                            value={deptFilter}
                            onChange={(e) => setDeptFilter(e.target.value)}
                            className="bg-transparent text-navy font-bold border-none outline-none cursor-pointer text-xs pr-0.5"
                          >
                            <option value="All">{t('doctors.filterAll')}</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Emergency">Emergency</option>
                          </select>
                          <ChevronDown size={13} className="text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {filteredDoctors.map((doc) => (
                    <div
                      key={doc._id}
                      className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-teal/40 transition-all group"
                    >
                      {/* Arched Top Image Container */}
                      <div className="w-full h-56 rounded-t-[100px] rounded-b-2xl overflow-hidden border border-teal-100 bg-gradient-to-b from-teal-light/20 to-teal/10 mb-4">
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
                              <Clock size={12} className="text-slate-400" /> {doc.experience}
                            </span>
                            <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                              <Star size={12} className="fill-amber-500 text-amber-500" /> {doc.rating}
                            </span>
                          </div>
                        </div>

                        {/* Green Action Button */}
                        <button
                          onClick={() => handleOpenBooking(doc)}
                          className="w-full btn-teal py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Calendar size={14} />
                          <span>{t('doctors.bookSlot')}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More Pill Button -> Redirects to All Doctors Page */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setCurrentView('all-doctors')}
                    className="btn-navy-outline bg-white px-8 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>{t('tabs.showMore')}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* 6. Department Showcase Container */}
            {(activeTab === 'departments' || activeTab === 'all') && (
              <div className="bg-teal-soft/60 border border-teal-100/90 rounded-[32px] p-6 sm:p-10 mb-12 shadow-sm" id="departments">
                {/* Header Title & Subtitle */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2 tracking-tight">
                    {t('tabs.careTitle')}
                  </h2>
                  <p className="text-slate-600 text-sm font-medium">
                    {t('tabs.careSubtitle')}
                  </p>
                </div>

                {/* 2x3 Department Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {departmentKeys.map((key) => (
                    <div
                      key={key}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4 hover:border-teal hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-soft to-teal-100 text-teal-dark flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal group-hover:text-white transition-colors">
                        {mockDepartmentIcons[key]}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-bold text-navy mb-1.5">{t(`departments.${key}.title`)}</h3>
                        <p className="text-slate-600 text-xs leading-relaxed mb-3">{t(`departments.${key}.desc`)}</p>
                        
                        <button
                          onClick={() => setCurrentView('all-departments')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-teal-dark transition-colors cursor-pointer"
                        >
                          <span>Explore Services</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More Pill Button -> Redirects to All Departments Page */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setCurrentView('all-departments')}
                    className="btn-navy-outline bg-white px-8 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>{t('tabs.showMore')}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* 7. Why Choose Us Section */}
            <div className="bg-white border border-teal-100/80 rounded-[32px] p-8 sm:p-12 mb-12 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-flex items-center gap-1.5 bg-teal-soft text-teal-dark font-semibold text-xs px-3.5 py-1 rounded-full border border-teal-100 uppercase tracking-wider mb-2">
                  <CheckCircle2 size={14} /> {t('whyUs.tag')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">{t('whyUs.title')}</h2>
                <p className="text-slate-600 text-sm">{t('whyUs.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-teal-soft/40 border border-teal-100/60 hover:bg-teal-soft/80 transition-colors">
                  <ShieldAlert className="text-teal mb-4" size={32} />
                  <h3 className="font-bold text-navy text-base mb-2">{t('whyUs.feature1Title')}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{t('whyUs.feature1Desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-teal-soft/40 border border-teal-100/60 hover:bg-teal-soft/80 transition-colors">
                  <Award className="text-teal mb-4" size={32} />
                  <h3 className="font-bold text-navy text-base mb-2">{t('whyUs.feature2Title')}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{t('whyUs.feature2Desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-teal-soft/40 border border-teal-100/60 hover:bg-teal-soft/80 transition-colors">
                  <Microscope className="text-teal mb-4" size={32} />
                  <h3 className="font-bold text-navy text-base mb-2">{t('whyUs.feature3Title')}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{t('whyUs.feature3Desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-teal-soft/40 border border-teal-100/60 hover:bg-teal-soft/80 transition-colors">
                  <CreditCard className="text-teal mb-4" size={32} />
                  <h3 className="font-bold text-navy text-base mb-2">{t('whyUs.feature4Title')}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{t('whyUs.feature4Desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Emergency Call Banner */}
          <section className="bg-gradient-to-r from-navy to-navy-dark text-white py-14 text-center mt-auto shadow-lg" id="services">
            <div className="max-w-4xl mx-auto px-4">
              <ShieldAlert size={44} className="text-teal-light mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {t('departments.emergency.title')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                {t('departments.emergency.desc')}
              </p>
              <a
                href="tel:1234567890"
                className="inline-flex items-center justify-center gap-2.5 btn-teal text-base px-8 py-3.5 rounded-xl font-bold"
              >
                <PhoneCall size={20} />
                <span>{t('nav.helpline')} +91 1234567890</span>
              </a>
            </div>
          </section>
        </>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedDoctor={selectedDoctor}
        doctors={mockDoctors}
      />

      {/* Auth & Profile Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
