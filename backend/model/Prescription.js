const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },  // e.g. "500mg"
        frequency: { type: String, required: true },// e.g. "1-0-1 after meals"
        duration: { type: String, required: true }, // e.g. "5 days"
      },
    ],
    instructions: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
