const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getDoctors,
  getDepartments,
  bookAppointment,
  getPatientAppointments,
  getPatientPrescriptions,
  getPatientReports,
  getPatientPayments,
} = require('../controller/patientController');

// Public/Patient routes for doctor & department discovery
router.get('/doctors', getDoctors);
router.get('/departments', getDepartments);

// Protected Patient routes
router.use(protect);
router.use(authorize('patient', 'admin'));

router.post('/appointments', bookAppointment);
router.get('/appointments', getPatientAppointments);
router.get('/prescriptions', getPatientPrescriptions);
router.get('/medical-reports', getPatientReports);
router.get('/payments', getPatientPayments);

module.exports = router;
