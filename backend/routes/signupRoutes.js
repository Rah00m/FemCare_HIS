const express = require("express");
const router = express.Router();
const { verifyTokenMiddleware } = require("../utils/authMiddleware"); // استيراد الميدل وير للتحقق من التوكن
const { getUserDetails } = require("../controllers/userController");

const { signup } = require("../controllers/signupController");
router.post("/", signup);
router.get("/user/details", verifyTokenMiddleware, getUserDetails);

module.exports = router;
