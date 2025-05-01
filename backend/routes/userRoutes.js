const express = require("express");
const {
  getUserDetails,
  updateUserProfile,
} = require("../controllers/userController");
const { verifyTokenMiddleware } = require("../utils/authMiddleware"); // استيراد الميدل وير للتحقق من التوكن
const upload = require("../utils/uploadMiddleware");
const router = express.Router();
router.get("/user/details", verifyTokenMiddleware, getUserDetails);

router.put(
  "/user/update",
  verifyTokenMiddleware,
  upload.single("profilePhoto"),
  updateUserProfile
);

module.exports = router;
