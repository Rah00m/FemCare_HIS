const multer = require('multer');
const path = require('path');

// إعدادات Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // تحديد مجلد التخزين
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // استخراج الامتداد من اسم الملف
    const filename = Date.now() + ext; // إضافة توقيت لتجنب الأسماء المتكررة
    cb(null, filename); // تخزين الصورة بالاسم الجديد
  }
});

const upload = multer({ storage });

module.exports = upload;
