const express = require('express');
const { getUserDetails } = require('../controllers/userController');
const { verifyTokenMiddleware } = require('../utils/authMiddleware'); // استيراد الميدل وير للتحقق من التوكن

const router = express.Router();

router.get('/user/details', verifyTokenMiddleware, getUserDetails);

module.exports = router;
