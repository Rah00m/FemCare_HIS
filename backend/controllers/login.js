const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }
  try {
    let user;
    let role = "";
    if (email.includes("@admin.com")) {
      role = "admin";
    } else if (email.includes("@doctor.com")) {
      role = "doctor";
    } else {
      role = "patient";
    }
    if (role === "admin") {
      user = await prisma.Admin.findUnique({ where: { email } });
    } else if (role === "doctor") {
      user = await prisma.Doctor.findUnique({ where: { email } });
    } else {
      user = await prisma.Patient.findUnique({ where: { email } });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token, role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};
