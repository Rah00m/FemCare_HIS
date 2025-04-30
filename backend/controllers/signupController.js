const { generateToken } = require('../utils/authUtils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// دالة لحساب العمر بناءً على تاريخ الميلاد
function calcAge(dob) {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) { 
        return null; // في حال كان التاريخ غير صالح
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const signup = async (req, res) => {
    const { name, email, password, phone, dob, nationalId } = req.body;

    if (!dob) {
        return res.status(400).json({ message: 'Date of birth (dob) is required!' });
    }

    const profilePhoto = req.file ? req.file.filename : null;

    try {
        let user;
        let userId;
        let role = '';
        const parsedDob = new Date(dob);

        if (isNaN(parsedDob.getTime())) {
            return res.status(400).json({ message: 'Invalid date format for dob. Please provide a valid date in YYYY-MM-DD format.' });
        }

        const age = calcAge(parsedDob);
        if (age === null) {
            return res.status(400).json({ message: 'Invalid date of birth.' });
        }

        if (email.endsWith('@doctor.com')) {
            user = await prisma.Doctor.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'Doctor with this email already exists!' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            user = await prisma.Doctor.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone,
                    dob: parsedDob,
                    nationalId,
                    profilePhoto,
                },
            });
            userId = user.id;
            role = 'doctor';

        } else if (email.endsWith('@admin.com')) {
            user = await prisma.Admin.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'Admin with this email already exists!' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            user = await prisma.Admin.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            userId = user.id;
            role = 'admin';

        } else {
            user = await prisma.Patient.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'Patient with this email already exists!' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            user = await prisma.Patient.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone,
                    dob: parsedDob,
                    nationalId,
                    profilePhoto,
                    address: "",     
                },
            });
            userId = user.id;
            role = 'patient';
        }

        const token = generateToken(userId, role);

        console.log(" Received body:", req.body);
        console.log(" Received file:", req.file);

        return res.status(201).json({
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully!`,
            token,
            role,
            user,
            age,
        });

    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({
            message: 'Failed to signup',
            error: error.message,
        });
    }
};

module.exports = { signup };
