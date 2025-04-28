const express = require('express');
const router = express.Router();
const authController = require('../controllers/login');  
const { verifyTokenMiddleware } = require('../utils/authMiddleware'); // استيراد الميدل وير للتحقق من التوكن
const { getUserDetails } = require('../controllers/userController');
router.post('/', authController.login);
router.get('/user/details', verifyTokenMiddleware, getUserDetails);

module.exports = router;
