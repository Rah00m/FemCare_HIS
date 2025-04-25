const pool = require('../db');

// إضافة دكتور
const addDoctor = async (req, res) => {
  const { name, specialization, email, phone } = req.body;
  try {
    // استعلام SQL لإضافة دكتور
    const query = 'INSERT INTO doctors (name, specialization, email, phone) VALUES ($1, $2, $3, $4)';
    const values = [name, specialization, email, phone];
    await pool.query(query, values);
    
    res.status(201).json({ message: 'Doctor added successfully!' });
  } catch (error) {
    console.error('Error inserting doctor:', error);
    res.status(500).json({ message: 'Failed to add doctor' });
  }
};

// إضافة مريض
const addPatient = async (req, res) => {
  const { name, age, gender, doctor_id } = req.body;
  try {
    // استعلام SQL لإضافة مريض
    const query = 'INSERT INTO patients (name, age, gender, doctor_id) VALUES ($1, $2, $3, $4)';
    const values = [name, age, gender, doctor_id];
    await pool.query(query, values);
    
    res.status(201).json({ message: 'Patient added successfully!' });
  } catch (error) {
    console.error('Error inserting patient:', error);
    res.status(500).json({ message: 'Failed to add patient' });
  }
};

// حذف دكتور
const deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;
  try {
    // استعلام SQL لحذف دكتور
    const query = 'DELETE FROM doctors WHERE id = $1';
    const values = [doctorId];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Failed to delete doctor' });
  }
};

// حذف أدمن
const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;
  try {
    // استعلام SQL لحذف أدمن
    const query = 'DELETE FROM admins WHERE id = $1';
    const values = [adminId];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Failed to delete admin' });
  }
};

module.exports = { addDoctor, addPatient, deleteDoctor, deleteAdmin };
