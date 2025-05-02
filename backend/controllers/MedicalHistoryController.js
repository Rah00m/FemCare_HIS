// استيراد Prisma Client
const { PrismaClient } = require('@prisma/client');

// إنشاء instance من PrismaClient
const prisma = new PrismaClient();

// استخدام دالة `findMany` لجلب البيانات من جدول `MedicalHistory`
async function getMedicalHistory() {
  try {
    const medicalHistory = await prisma.medicalHistory.findMany();
    console.log(medicalHistory);
  } catch (error) {
    console.error('Error fetching medical history:', error);
  } finally {
    // إغلاق الاتصال بـ Prisma بعد الانتهاء
    await prisma.$disconnect();
  }
}

// استدعاء الدالة
getMedicalHistory();
