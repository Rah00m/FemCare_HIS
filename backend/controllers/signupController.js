const { generateToken } = require('../utils/authUtils')
const{PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
function  calcAge(dob){
    const birthDate=new Date(dob);
    const today=new Date();
    let age=today.getFullYear()-birthDate.getFullYear();
    const monthDiff=today.getMonth()-birthDate.getMonth();
    if(monthDiff<0 || (monthDiff===0 && today.getDate()<birthDate.getDate())){
        age--;
    }
    return age;
}
const signup= async (req,res)=>{
    const {name,email,password,phone,dob}=req.body;
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
                    phone,
                    dob,
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
        data: { name, email, password, phone, dob },
      });
      role = 'patient';
    userId = user.id;
      return res.status(201).json({ message: 'Patient signed up successfully!', user,age });
    
        }
    // Calculate age from date of birth
    const age = calcAge(user.dob);
    // Generate JWT token
    const token = generateToken(userId, role);

    return res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully!`,
      token,
      role,
      user,
    });

  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Failed to signup', error: error.message });
  }
};

module.exports = { signup };