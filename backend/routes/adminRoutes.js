const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const validateDoctorData = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields for doctor!' });
  }
  next();
};

const validatePatientData = (req, res, next) => {
  const { name, email, password, phone, age } = req.body;
  if (!name || !email || !password || !phone || !age) {
    return res.status(400).json({ message: 'Please provide all required fields for patient!' });
  }
  next();
};

// Patient Routes
router.post('/add-patient', validatePatientData, adminController.addPatient);
router.delete('/delete-patient/:patientId', adminController.deletePatient);

// Doctor Routes
router.post('/add-doctor', validateDoctorData, adminController.addDoctor);
router.delete('/delete-doctor/:doctorId', adminController.deleteDoctor);

// Admin Routes
router.post('/add-admin', adminController.addAdmin);
router.delete('/delete-admin/:adminId', adminController.deleteAdmin);

module.exports = router;
