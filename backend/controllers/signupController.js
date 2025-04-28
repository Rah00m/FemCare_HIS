const { generateToken } = require('../utils/authUtils')
const{PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const signup= async (req,res)=>{
    const {name,email,password,phone,age}=req.body;
    try{
        let user;
        let userId;
        let role='';
        if(email.endsWith('@doctor.com')){
            user = await prisma.Doctor.findUnique({
                where: {email}
            });
            if (user){
                return res.status(400).json({ message: 'Doctor with this email already exists!' });
            }
            //if not create doctor
            user =await prisma.Doctor.create({
                data:{
                    name,
                    email,
                    password,
                    phone
                },
            });
            userId = user.id;
            role = 'doctor';
            return res.status(201).json({ message: 'Doctor signed up successfully!', user });
        }else if(email.endsWith('@admin.com')){
            user= await prisma.Admin.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'Admin with this email already exists!' });
            }
                    // if not Create admin
                    user = await prisma.Admin.create({
            data: { name, email, password },
    });
            role = 'admin';
            userId = user.id;
    return res.status(201).json({ message: 'Admin signed up successfully!', user });
    } else {
      // Otherwise, create a patient
        user = await prisma.Patient.findUnique({ where: { email } });
    if (user) {
        return res.status(400).json({ message: 'Patient with this email already exists!' });
    }
    user = await prisma.Patient.create({
        data: { name, email, password, phone, age },
      });
      role = 'patient';
    userId = user.id;
      return res.status(201).json({ message: 'Patient signed up successfully!', user });
    
        }
    }catch(error){
        console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed to signup', error: error.message });
    }
    const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    const { name, email, password, phone, age } = req.body;

    try {
        let user;
        let userId;
        let role = '';
        
        if (email.endsWith('@doctor.com')) {
            user = await prisma.doctor.findUnique({ where: { email } });
            if (user) return res.status(400).json({ message: 'Doctor with this email already exists!' });

            user = await prisma.doctor.create({
                data: { name, email, password, phone }
            });
            role = 'doctor'; 
            userId = user.id;
        } else if (email.endsWith('@admin.com')) {
            user = await prisma.admin.findUnique({ where: { email } });
            if (user) return res.status(400).json({ message: 'Admin with this email already exists!' });

            user = await prisma.admin.create({
                data: { name, email, password }
            });
            role = 'admin';
            userId = user.id;
        } else {
            user = await prisma.patient.findUnique({ where: { email } });
            if (user) return res.status(400).json({ message: 'Patient with this email already exists!' });

            user = await prisma.patient.create({
                data: { name, email, password, phone, age }
            });
            role = 'patient';
            userId = user.id;
        }

        // Generate JWT token
        const token = generateToken(user.id, role);

        res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully!`, token, role });
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Failed to signup' });
      }
    };
};
module.exports ={signup};