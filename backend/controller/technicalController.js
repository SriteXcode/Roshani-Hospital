const TechDevice = require('../model/TechDevice');
const TechTicket = require('../model/TechTicket');
const User = require('../model/User');

// @desc    Technical Manager Dashboard
// @route   GET /api/technical/dashboard
const getTechDashboard = async (req, res, next) => {
  try {
    const totalDevices = await TechDevice.countDocuments();
    const onlineDevices = await TechDevice.countDocuments({ status: 'online' });
    const maintenanceDevices = await TechDevice.countDocuments({ status: 'maintenance' });
    const openTickets = await TechTicket.countDocuments({ status: 'open' });
    const inProgressTickets = await TechTicket.countDocuments({ status: 'in_progress' });
    const itStaffCount = await User.countDocuments({ role: 'tech_manager' });

    res.status(200).json({
      success: true,
      data: {
        totalDevices,
        onlineDevices,
        maintenanceDevices,
        openTickets,
        inProgressTickets,
        itStaffCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all hospital IT & medical devices
// @route   GET /api/technical/devices
const getDevices = async (req, res, next) => {
  try {
    const devices = await TechDevice.find().populate('department', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: devices.length, data: devices });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new device/equipment
// @route   POST /api/technical/devices
const registerDevice = async (req, res, next) => {
  try {
    const { deviceName, serialNumber, deviceType, departmentId, locationRoom, status } = req.body;

    const device = await TechDevice.create({
      deviceName,
      serialNumber,
      deviceType,
      department: departmentId,
      locationRoom,
      status: status || 'online',
    });

    res.status(201).json({ success: true, message: 'Device registered successfully', data: device });
  } catch (error) {
    next(error);
  }
};

// @desc    Update device status/maintenance
// @route   PUT /api/technical/devices/:id/status
const updateDeviceStatus = async (req, res, next) => {
  try {
    const { status, lastMaintenanceDate, nextMaintenanceDate } = req.body;
    const device = await TechDevice.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    if (status) device.status = status;
    if (lastMaintenanceDate) device.lastMaintenanceDate = lastMaintenanceDate;
    if (nextMaintenanceDate) device.nextMaintenanceDate = nextMaintenanceDate;

    await device.save();
    res.status(200).json({ success: true, message: 'Device status updated', data: device });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all technical issue tickets
// @route   GET /api/technical/tickets
const getTickets = async (req, res, next) => {
  try {
    const tickets = await TechTicket.find()
      .populate('device', 'deviceName serialNumber')
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    next(error);
  }
};

// @desc    Create technical incident ticket
// @route   POST /api/technical/tickets
const createTicket = async (req, res, next) => {
  try {
    const { title, description, deviceId, priority } = req.body;

    const ticket = await TechTicket.create({
      title,
      description,
      device: deviceId,
      reportedBy: req.user._id,
      priority: priority || 'medium',
    });

    res.status(201).json({ success: true, message: 'Technical ticket created', data: ticket });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign ticket to IT staff
// @route   PUT /api/technical/tickets/:id/assign
const assignTicket = async (req, res, next) => {
  try {
    const { assignedToId, status, resolutionNotes } = req.body;
    const ticket = await TechTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (assignedToId) ticket.assignedTo = assignedToId;
    if (status) ticket.status = status;
    if (resolutionNotes) ticket.resolutionNotes = resolutionNotes;

    await ticket.save();
    res.status(200).json({ success: true, message: 'Ticket assigned/updated', data: ticket });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTechDashboard,
  getDevices,
  registerDevice,
  updateDeviceStatus,
  getTickets,
  createTicket,
  assignTicket,
};
