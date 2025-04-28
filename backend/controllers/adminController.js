  // admin controller
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add Doctor
const addDoctor = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    if (!email.endsWith('@doctor.com')) {
      return res.status(400).json({ message: 'Please,Write a valid email' });
    }
    const existingDoctor = await prisma.doctor.findUnique({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists!' });
    }

    const doctor = await prisma.doctor.create({
      data: { name, email, password, phone },
    });

    res.status(201).json({ message: 'Doctor added successfully!', doctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: parseInt(doctorId) } });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await prisma.doctor.delete({
      where: { id: parseInt(doctorId) },
    });

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Failed to delete doctor', error: error.message });
  }
};
// Update Doctor
const updateDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { name, email, password, phone } = req.body;

  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: parseInt(doctorId) } });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: parseInt(doctorId) },
      data: { name, email, password, phone },
    });

    res.status(200).json({ message: 'Doctor updated successfully!', updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Failed to update doctor', error: error.message });
  }
};
// Add Patient
const addPatient = async (req, res) => {
  const { name, email, password, age, phone } = req.body;

  try {
    const existingPatient = await prisma.patient.findUnique({ where: { email } });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient with this email already exists!' });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        password,
        age,
        phone,
      },
    });

    res.status(201).json({ message: 'Patient added successfully!', patient });
  } catch (error) {
    console.error('Error inserting patient:', error);
    res.status(500).json({ message: 'Failed to add patient', error: error.message });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await prisma.patient.findUnique({ where: { id: parseInt(patientId) } });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found!' });
    }

    await prisma.patient.delete({
      where: { id: parseInt(patientId) },
    });

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Failed to delete patient', error: error.message });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    await prisma.admin.delete({
      where: {
        id: parseInt(adminId),
      },
    });

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Failed to delete admin', error: error.message });
  }
};
// Add Admin
const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists!' });
    }

    const admin = await prisma.admin.create({
      data: { name, email, password },
    });

    res.status(201).json({ message: 'Admin added successfully!', admin });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Failed to add admin', error: error.message });
  }
};

module.exports = {
  addDoctor,
  deleteDoctor,
  updateDoctor,
  addPatient,
  deletePatient,
  deleteAdmin,
  addAdmin,
};
