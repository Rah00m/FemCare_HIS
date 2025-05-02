// const { verifyToken } = require('../utils/authUtils');  // استيراد دالة التحقق من التوكن
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const verifyTokenMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; 
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   const decoded = verifyToken(token);  // فك التوكن باستخدام دالة verifyToken
//   if (!decoded) {
//     return res.status(400).json({ message: 'Invalid or expired token.' });
//   }

//   const user = await prisma[decoded.role].findUnique({ where: { id: decoded.id } });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found.' });
//   }

//   req.user = user;  // إضافة تفاصيل المستخدم إلى الطلب (req)
//   next();  // الانتقال إلى الدالة التالية
// };

// module.exports = { verifyTokenMiddleware };
const { verifyToken } = require('./authUtils'); // أو المسار الصحيح لفولدر authUtils

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // استخراج التوكن من الهيدر
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);  // التحقق من التوكن باستخدام دالة verifyToken
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    // req.user = decoded
    req.user = { 
        id: decoded.id, 
        role: decoded.role // تأكد من أن التوكن يحتوي على الـ role
    };
    // req.user = { id: decoded.id }
    req.userId = decoded.id; // تخزين الـ userId في الطلب للوصول إليه لاحقًا
    next();  // الانتقال إلى الخطوة التالية (الدالة)
};

module.exports = { verifyTokenMiddleware };
