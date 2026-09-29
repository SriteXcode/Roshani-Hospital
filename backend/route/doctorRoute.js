const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getDoctorDashboard,
  getDoctorAppointments,
  updateAppointmentStatus,
  createPrescription,
  createMedicalReport,
} = require('../controller/doctorController');

router.use(protect);
router.use(authorize('doctor', 'admin'));

router.get('/dashboard', getDoctorDashboard);
router.get('/appointments', getDoctorAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);
router.post('/prescriptions', createPrescription);
router.post('/medical-reports', createMedicalReport);

module.exports = router;
