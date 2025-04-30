const express = require("express");
const router = express.Router();
const { verifyTokenMiddleware } = require("../utils/authMiddleware"); // استيراد الميدل وير للتحقق من التوكن
const { getUserDetails } = require("../controllers/userController");
const upload = require('../utils/uploadMiddleware');

const { signup } = require('../controllers/signupController'); // تأكد من صحة المسار
// router.post("/", signup);
router.post('/', upload.single('profilePhoto'), signup);
router.get("/user/details", verifyTokenMiddleware, getUserDetails);

module.exports = router;
