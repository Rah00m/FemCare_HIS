const { verifyToken } = require('../utils/authUtils');  // استيراد دالة التحقق من التوكن
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token);  // فك التوكن باستخدام دالة verifyToken
  if (!decoded) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }

  const user = await prisma[decoded.role].findUnique({ where: { id: decoded.id } });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  req.user = user;  // إضافة تفاصيل المستخدم إلى الطلب (req)
  next();  // الانتقال إلى الدالة التالية
};

module.exports = { verifyTokenMiddleware };
