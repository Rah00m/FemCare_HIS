const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// مسار إضافة دكتور
router.post('/add-doctor', adminController.addDoctor);

// مسار إضافة مريض
router.post('/add-patient', adminController.addPatient);

// مسار حذف دكتور
router.delete('/delete-doctor/:doctorId', adminController.deleteDoctor);

// مسار حذف أدمن
router.delete('/delete-admin/:adminId', adminController.deleteAdmin);

module.exports = router;
