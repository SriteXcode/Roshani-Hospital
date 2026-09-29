const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Gateway Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'RoshniHospitality Multi-Role Hospital Management System API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      patient: '/api/patient',
      doctor: '/api/doctor',
      admin: '/api/admin',
      technical: '/api/technical',
      bookings: '/api/bookings',
      contact: '/api/contact',
    },
  });
});

// Mount Feature & Role Domain Routes
app.use('/api/health', require('./route/healthRoute'));
app.use('/api/auth', require('./route/authRoute'));
app.use('/api/patient', require('./route/patientRoute'));
app.use('/api/doctor', require('./route/doctorRoute'));
app.use('/api/admin', require('./route/adminRoute'));
app.use('/api/technical', require('./route/technicalRoute'));
app.use('/api/bookings', require('./route/bookingRoute'));
app.use('/api/contact', require('./route/contactRoute'));

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[Server] RoshniHospitality Hospital Management API running in ${
      process.env.NODE_ENV || 'development'
    } mode on port ${PORT}`
  );
});
