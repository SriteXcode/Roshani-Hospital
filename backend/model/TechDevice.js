const mongoose = require('mongoose');

const techDeviceSchema = new mongoose.Schema(
  {
    deviceName: {
      type: String,
      required: [true, 'Device name is required'],
      trim: true,
    },
    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    deviceType: {
      type: String,
      enum: ['medical_equipment', 'it_hardware', 'network_device', 'server', 'display'],
      default: 'medical_equipment',
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    locationRoom: {
      type: String,
      trim: true,
      default: 'ICU-1',
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'maintenance', 'decommissioned'],
      default: 'online',
    },
    lastMaintenanceDate: {
      type: Date,
    },
    nextMaintenanceDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TechDevice', techDeviceSchema);
