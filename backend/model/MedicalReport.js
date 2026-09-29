const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
    },
    reportType: {
      type: String,
      enum: ['Blood Test', 'X-Ray', 'MRI Scan', 'CT Scan', 'Pathology', 'General Checkup'],
      default: 'General Checkup',
    },
    results: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MedicalReport', medicalReportSchema);
