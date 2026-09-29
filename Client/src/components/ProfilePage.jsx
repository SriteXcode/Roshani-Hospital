import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  Activity,
  CreditCard,
  LogOut,
  Pill,
  Download,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  CheckCircle2,
  Heart,
  UserCheck,
  Edit3,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const defaultProfileData = {
  personalDetails: {
    fullName: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@example.com',
    gender: 'Male',
    age: '38 Years',
    bloodGroup: 'O+',
    emergencyContact: '+91 91234 56789 (Sunita Kumar - Wife)',
    address: 'Flat 402, Green Valley Towers, Healthcare Blvd, Medical City',
  },
  upcomingAppointments: [
    {
      id: 'APT-1082',
      doctorName: 'Dr. Ananya Sharma',
      doctorSpecialty: 'Cardiology Specialist',
      doctorQualifications: 'MBBS, MD (Cardiology)',
      doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      department: 'Cardiology',
      date: 'Tomorrow, 10:30 AM',
      problem: 'Mild chest tightness during light exercise & blood pressure checkup.',
      status: 'Confirmed',
      type: 'OPD Specialist Consultation',
      room: 'OPD Room 204, 2nd Floor',
    },
    {
      id: 'APT-1094',
      doctorName: 'Dr. Vikramaditya Roy',
      doctorSpecialty: 'Senior Neurologist',
      doctorQualifications: 'MBBS, DM (Neurology)',
      doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      department: 'Neurology',
      date: 'Oct 02, 2026 - 04:00 PM',
      problem: 'Follow-up consultation for recurring migraine headaches & EEG report analysis.',
      status: 'Scheduled',
      type: 'Follow-up Checkup',
      room: 'Neuro Block 301, 3rd Floor',
    },
  ],
  prescriptions: [
    {
      id: 'RX-8841',
      doctorName: 'Dr. Ananya Sharma',
      department: 'Cardiology',
      date: 'Sep 15, 2026',
      problem: 'Primary Stage Hypertension & High Cholesterol Screening',
      medicines: [
        { name: 'Telmisartan 40mg', dosage: '1 Tablet - Once Daily (Morning after breakfast)', duration: '30 Days' },
        { name: 'Atorvastatin 10mg', dosage: '1 Tablet - Once Daily (Night after dinner)', duration: '30 Days' },
        { name: 'Ecosprin 75mg', dosage: '1 Tablet - Once Daily (After lunch)', duration: '30 Days' },
      ],
      instructions: 'Low sodium diet, 30 minutes light morning walk daily. Repeat Lipid Profile test in 30 days.',
    },
  ],
  medicalReports: [
    {
      id: 'REP-4091',
      title: 'Lipid Profile & Lipid Panel Test',
      department: 'Cardiology Diagnostic Lab',
      date: 'Sep 16, 2026',
      doctor: 'Dr. Ananya Sharma',
      status: 'Completed',
      findings: 'Total Cholesterol: 210 mg/dL (Slightly High), HDL: 45 mg/dL, LDL: 135 mg/dL, Triglycerides: 160 mg/dL.',
      fileSize: '1.2 MB PDF',
    },
    {
      id: 'REP-3902',
      title: 'Digital Chest X-Ray (PA View)',
      department: 'Radiology Unit',
      date: 'Aug 28, 2026',
      doctor: 'Dr. Amitav Mukherji',
      status: 'Completed',
      findings: 'Normal lung fields and cardiac silhouette. No lung opacity or pleural effusion detected.',
      fileSize: '3.5 MB PDF',
    },
  ],
  paymentHistory: [
    {
      id: 'TXN-90218',
      date: 'Sep 15, 2026',
      description: 'Senior Specialist Cardiology OPD Consultation Fee',
      amount: '₹800',
      method: 'UPI / PhonePe',
      status: 'Paid',
      receiptNo: 'RCP-2026-9021',
    },
    {
      id: 'TXN-88410',
      date: 'Sep 16, 2026',
      description: 'Diagnostic Pathology - Lipid Panel Test',
      amount: '₹1,200',
      method: 'Cashless Insurance Desk Claim',
      status: 'Cashless Claimed',
      receiptNo: 'RCP-2026-8841',
    },
  ],
};

const ProfilePage = ({ user, onLogout, onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'appointments' | 'prescriptions' | 'reports' | 'payments'
  const [profile, setProfile] = useState({
    ...defaultProfileData,
    personalDetails: {
      ...defaultProfileData.personalDetails,
      phone: user?.phone || defaultProfileData.personalDetails.phone,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile.personalDetails);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile((prev) => ({ ...prev, personalDetails: editForm }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-mint-bg py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Banner & Patient Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-soft/40 rounded-full blur-3xl -z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-teal to-teal-dark flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-md shrink-0">
              {profile.personalDetails.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
                  {profile.personalDetails.fullName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <ShieldCheck size={13} />
                  {t('auth.verifiedStatus')}
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 font-semibold text-navy">
                  <Phone size={14} className="text-teal" />
                  {profile.personalDetails.phone}
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <Mail size={14} className="text-slate-400" />
                  {profile.personalDetails.email}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Action & Logout Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial btn-navy-outline px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-initial bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span>{t('auth.logout')}</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-light/20 text-teal flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <span className="text-lg font-extrabold text-navy">{profile.upcomingAppointments.length}</span>
              <p className="text-[11px] font-semibold text-slate-500">Upcoming Visits</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Pill size={20} />
            </div>
            <div>
              <span className="text-lg font-extrabold text-navy">{profile.prescriptions.length}</span>
              <p className="text-[11px] font-semibold text-slate-500">Active Prescriptions</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-lg font-extrabold text-navy">{profile.medicalReports.length}</span>
              <p className="text-[11px] font-semibold text-slate-500">Lab Reports</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <span className="text-lg font-extrabold text-navy">{profile.paymentHistory.length}</span>
              <p className="text-[11px] font-semibold text-slate-500">Billing Receipts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-teal-100">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-teal text-white shadow-sm'
              : 'bg-white text-navy hover:text-teal border border-slate-200/80'
          }`}
        >
          <User size={16} />
          <span>Personal Details</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'bg-teal text-white shadow-sm'
              : 'bg-white text-navy hover:text-teal border border-slate-200/80'
          }`}
        >
          <Calendar size={16} />
          <span>Appointments & Doctors ({profile.upcomingAppointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'prescriptions'
              ? 'bg-teal text-white shadow-sm'
              : 'bg-white text-navy hover:text-teal border border-slate-200/80'
          }`}
        >
          <Pill size={16} />
          <span>Prescriptions ({profile.prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-teal text-white shadow-sm'
              : 'bg-white text-navy hover:text-teal border border-slate-200/80'
          }`}
        >
          <Activity size={16} />
          <span>Medical Reports ({profile.medicalReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'bg-teal text-white shadow-sm'
              : 'bg-white text-navy hover:text-teal border border-slate-200/80'
          }`}
        >
          <CreditCard size={16} />
          <span>Payment History ({profile.paymentHistory.length})</span>
        </button>
      </div>

      {/* Tab 1: Personal Details & Edit Form */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-extrabold text-navy flex items-center gap-2">
              <UserCheck className="text-teal" size={22} />
              Personal & Patient Information
            </h2>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Age & Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Blood Group</label>
                <input
                  type="text"
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Emergency Contact</label>
                <input
                  type="text"
                  value={editForm.emergencyContact}
                  onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-navy mb-1.5">Residential Address</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-navy focus:border-teal outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-teal px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</span>
                <p className="text-sm font-bold text-navy">{profile.personalDetails.fullName}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</span>
                <p className="text-sm font-bold text-navy">{profile.personalDetails.phone}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</span>
                <p className="text-sm font-bold text-navy">{profile.personalDetails.email}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Age & Gender</span>
                <p className="text-sm font-bold text-navy">{profile.personalDetails.age} ({profile.personalDetails.gender})</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Blood Group</span>
                <p className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block">
                  {profile.personalDetails.bloodGroup}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Emergency Contact</span>
                <p className="text-xs font-bold text-navy">{profile.personalDetails.emergencyContact}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 sm:col-span-2 lg:col-span-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Residential Address</span>
                <p className="text-sm font-semibold text-navy flex items-center gap-1.5">
                  <MapPin size={15} className="text-teal shrink-0" />
                  {profile.personalDetails.address}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Appointments & Assigned Doctors with Problem Info */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm">
            <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <Calendar className="text-teal" size={22} />
              Upcoming Scheduled Appointments
            </h2>

            <div className="space-y-6">
              {profile.upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-start justify-between gap-6 hover:border-teal/50 transition-all"
                >
                  {/* Doctor Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={apt.doctorImage}
                      alt={apt.doctorName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-teal-100 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-bold text-teal bg-teal-soft px-2.5 py-0.5 rounded-md">
                          {apt.department}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 size={12} /> {apt.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-navy">{apt.doctorName}</h3>
                      <p className="text-xs text-slate-500 font-semibold mb-2">{apt.doctorSpecialty} ({apt.doctorQualifications})</p>

                      {/* Information About Their Problem */}
                      <div className="bg-white p-3.5 rounded-2xl border border-teal-100/80 mb-3">
                        <span className="text-[11px] font-extrabold text-navy uppercase tracking-wider block mb-1 flex items-center gap-1">
                          <AlertCircle size={13} className="text-amber-500" />
                          Chief Complaint / Medical Concern Details:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{apt.problem}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visit Time & Location Box */}
                  <div className="w-full lg:w-72 bg-white rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2.5 shrink-0 shadow-xs">
                    <div className="flex items-center gap-2 text-navy font-bold">
                      <Clock size={16} className="text-teal" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Stethoscope size={16} className="text-slate-400" />
                      <span>{apt.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <MapPin size={16} className="text-slate-400" />
                      <span>{apt.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <Pill className="text-teal" size={22} />
            Digital Medical Prescriptions
          </h2>

          <div className="space-y-6">
            {profile.prescriptions.map((rx) => (
              <div key={rx.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60 flex-wrap gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{rx.id} • {rx.date}</span>
                    <h3 className="text-base font-bold text-navy">{rx.doctorName} ({rx.department})</h3>
                  </div>
                  <button className="btn-navy-outline px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                    <Download size={14} />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 mb-4 text-xs">
                  <strong className="text-navy block mb-1">Diagnosed Concern / Problem:</strong>
                  <p className="text-slate-600 font-medium">{rx.problem}</p>
                </div>

                {/* Medicines List */}
                <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider mb-3">Prescribed Medicines ({rx.medicines.length}):</h4>
                <div className="space-y-2 mb-4">
                  {rx.medicines.map((med, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Pill size={14} className="text-teal" />
                        <span className="font-bold text-navy">{med.name}</span>
                      </div>
                      <span className="text-slate-600 font-medium">{med.dosage}</span>
                      <span className="text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">{med.duration}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 font-medium">
                  <strong>Doctor's Advice:</strong> {rx.instructions}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Medical Reports & Diagnostics */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <Activity className="text-teal" size={22} />
            Diagnostic & Pathology Lab Reports
          </h2>

          <div className="space-y-4">
            {profile.medicalReports.map((rep) => (
              <div key={rep.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-teal bg-teal-soft px-2.5 py-0.5 rounded-md">{rep.department}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{rep.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-navy">{rep.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{rep.findings}</p>
                  <span className="text-[11px] text-slate-400 mt-1 block">Prescribed by: {rep.doctor}</span>
                </div>

                <button className="btn-teal px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer">
                  <Download size={14} />
                  <span>{rep.fileSize}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Payment & Billing History */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <CreditCard className="text-teal" size={22} />
            Payment & Billing History
          </h2>

          <div className="space-y-4">
            {profile.paymentHistory.map((pay) => (
              <div key={pay.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-navy">{pay.receiptNo}</span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">{pay.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-navy">{pay.description}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Date: {pay.date} • Paid via {pay.method}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                  <span className="text-lg font-extrabold text-navy">{pay.amount}</span>
                  <button className="btn-navy-outline px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                    <Download size={14} />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
