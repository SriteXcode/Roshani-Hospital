const Doctor = require('../model/Doctor');
const Appointment = require('../model/Appointment');
const Prescription = require('../model/Prescription');
const MedicalReport = require('../model/MedicalReport');

// @desc    Doctor Dashboard Metrics
// @route   GET /api/doctor/dashboard
const getDoctorDashboard = async (req, res, next) => {
  try {
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    const totalAppointments = await Appointment.countDocuments({ doctor: doctorProfile._id });
    const pendingAppointments = await Appointment.countDocuments({ doctor: doctorProfile._id, status: 'pending' });
    const completedAppointments = await Appointment.countDocuments({ doctor: doctorProfile._id, status: 'completed' });

    res.status(200).json({
      success: true,
      data: {
        doctor: req.user.name,
        specialty: doctorProfile.specialty,
        totalAppointments,
        pendingAppointments,
        completedAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get assigned appointments for doctor
// @route   GET /api/doctor/appointments
const getDoctorAppointments = async (req, res, next) => {
  try {
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    const appointments = await Appointment.find({ doctor: doctorProfile._id })
      .populate('patient', 'name email phone')
      .sort({ appointmentDate: 1 });

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status / consultation notes
// @route   PUT /api/doctor/appointments/:id/status
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, consultationNotes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (status) appointment.status = status;
    if (consultationNotes) appointment.consultationNotes = consultationNotes;

    await appointment.save();
    res.status(200).json({ success: true, message: 'Appointment updated', data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Create prescription for patient
// @route   POST /api/doctor/prescriptions
const createPrescription = async (req, res, next) => {
  try {
    const { patientId, appointmentId, medicines, instructions } = req.body;

    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user._id,
      appointment: appointmentId,
      medicines,
      instructions,
    });

    res.status(201).json({ success: true, message: 'Prescription created successfully', data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Issue medical report for patient
// @route   POST /api/doctor/medical-reports
const createMedicalReport = async (req, res, next) => {
  try {
    const { patientId, title, reportType, results, fileUrl } = req.body;

    const report = await MedicalReport.create({
      patient: patientId,
      doctor: req.user._id,
      title,
      reportType,
      results,
      fileUrl,
    });

    res.status(201).json({ success: true, message: 'Medical report issued successfully', data: report });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctorDashboard,
  getDoctorAppointments,
  updateAppointmentStatus,
  createPrescription,
  createMedicalReport,
};
