const mongoose = require('mongoose');

// @desc    Get API health status
// @route   GET /api/health
// @access  Public
const getHealthStatus = (req, res) => {
  const dbStateMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const dbState = dbStateMap[mongoose.connection.readyState] || 'Unknown';

  res.status(200).json({
    success: true,
    message: 'RoshniHospitality API is running smoothly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbState,
      name: mongoose.connection.name || 'roshni_hospitality',
    },
  });
};

module.exports = { getHealthStatus };
