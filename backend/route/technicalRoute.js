const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getTechDashboard,
  getDevices,
  registerDevice,
  updateDeviceStatus,
  getTickets,
  createTicket,
  assignTicket,
} = require('../controller/technicalController');

router.use(protect);
router.use(authorize('tech_manager', 'admin'));

router.get('/dashboard', getTechDashboard);
router.get('/devices', getDevices);
router.post('/devices', registerDevice);
router.put('/devices/:id/status', updateDeviceStatus);
router.get('/tickets', getTickets);
router.post('/tickets', createTicket);
router.put('/tickets/:id/assign', assignTicket);

module.exports = router;
