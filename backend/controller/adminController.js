const User = require('../model/User');
const Doctor = require('../model/Doctor');
const Patient = require('../model/Patient');
const Department = require('../model/Department');
const Appointment = require('../model/Appointment');
const Billing = require('../model/Billing');

// @desc    Admin Executive Dashboard
// @route   GET /api/admin/dashboard
const getAdminDashboard = async (req, res, next) => {
  try {
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalTechManagers = await User.countDocuments({ role: 'tech_manager' });
    const totalAppointments = await Appointment.countDocuments();
    const totalDepartments = await Department.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalDoctors,
        totalTechManagers,
        totalAppointments,
        totalDepartments,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users & manage roles
// @route   GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role & permissions
// @route   PUT /api/admin/users/:id/role
const updateUserRole = async (req, res, next) => {
  try {
    const { role, permissions } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (role) user.role = role;
    if (permissions) user.permissions = permissions;

    await user.save();
    res.status(200).json({ success: true, message: 'User role & permissions updated', data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Create department
// @route   POST /api/admin/departments
const createDepartment = async (req, res, next) => {
  try {
    const { name, code, description, headDoctor, location } = req.body;
    const department = await Department.create({ name, code, description, headDoctor, location });
    res.status(201).json({ success: true, message: 'Department created', data: department });
  } catch (error) {
    next(error);
  }
};

// @desc    Create/Onboard Doctor Profile
// @route   POST /api/admin/doctors
const createDoctorProfile = async (req, res, next) => {
  try {
    const { userId, specialty, qualifications, departmentId, consultationFee, availableDays } = req.body;

    const doctor = await Doctor.create({
      user: userId,
      specialty,
      qualifications,
      department: departmentId,
      consultationFee,
      availableDays,
    });

    res.status(201).json({ success: true, message: 'Doctor profile created', data: doctor });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboard,
  getUsers,
  updateUserRole,
  createDepartment,
  createDoctorProfile,
};
