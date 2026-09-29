const Booking = require('../model/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const { guestName, email, phone, serviceType, checkInDate, checkOutDate, guests, specialRequests } = req.body;

    if (!guestName || !email || !phone || !checkInDate || !checkOutDate) {
      res.status(400);
      throw new Error('Please fill all required fields');
    }

    const booking = await Booking.create({
      guestName,
      email,
      phone,
      serviceType,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (or Admin)
const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getBookings };
