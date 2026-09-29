const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAdminDashboard,
  getUsers,
  updateUserRole,
  createDepartment,
  createDoctorProfile,
} = require('../controller/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getAdminDashboard);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.post('/departments', createDepartment);
router.post('/doctors', createDoctorProfile);

module.exports = router;
