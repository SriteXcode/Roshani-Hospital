const Doctor = require('../model/Doctor');
const Department = require('../model/Department');
const Appointment = require('../model/Appointment');
const Prescription = require('../model/Prescription');
const MedicalReport = require('../model/MedicalReport');
const Billing = require('../model/Billing');

// @desc    Get all doctors (Public/Patient)
// @route   GET /api/patient/doctors
const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isAvailable: true })
      .populate('user', 'name email phone')
      .populate('department', 'name location');
    res.status(200).json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all departments (Public/Patient)
// @route   GET /api/patient/departments
const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    next(error);
  }
};

// @desc    Book appointment
// @route   POST /api/patient/appointments
const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, departmentId, appointmentDate, timeSlot, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      department: departmentId,
      appointmentDate,
      timeSlot,
      reason,
    });

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient's appointments
// @route   GET /api/patient/appointments
const getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name email' } })
      .populate('department', 'name')
      .sort({ appointmentDate: -1 });

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient's prescriptions
// @route   GET /api/patient/prescriptions
const getPatientPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user._id })
      .populate('doctor', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: prescriptions.length, data: prescriptions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient's medical reports
// @route   GET /api/patient/medical-reports
const getPatientReports = async (req, res, next) => {
  try {
    const reports = await MedicalReport.find({ patient: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient's billing payments
// @route   GET /api/patient/payments
const getPatientPayments = async (req, res, next) => {
  try {
    const payments = await Billing.find({ patient: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: payments.length, data: payments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  getDepartments,
  bookAppointment,
  getPatientAppointments,
  getPatientPrescriptions,
  getPatientReports,
  getPatientPayments,
};
