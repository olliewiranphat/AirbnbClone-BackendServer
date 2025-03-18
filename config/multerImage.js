const multer = require("multer");

// ✅ ตั้งค่า Multer ให้เก็บไฟล์ไว้ใน Memory (Buffer)
const storage = multer.memoryStorage();

// ✅ ตรวจสอบว่าเป็นไฟล์ภาพ
const fileFilter = (req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
        cb(null, true); // ✅ อนุญาตให้อัปโหลด
    } else {
        console.log("❌ Unsupported file type:", file.mimetype); // Debug
        cb(null, false); // ❌ ปฏิเสธไฟล์ที่ไม่ใช่รูปภาพ
    }
};

// ✅ ใช้ fileFilter และ memoryStorage
const upload = multer({ storage, fileFilter });

module.exports = upload;




///NOTE:
//โดยปกติ middleware ใน Express ต้องเรียก next() เพื่อให้ request ไปยัง middleware หรือ route handler ถัดไป
// แต่ Multer (upload.single("file")) เป็น middleware พิเศษที่จัดการ req.file และเรียก next() ให้โดยอัตโนมัติ
//เมื่อใช้ upload.single("file"), Multer ทำงานเป็น middleware และจะเรียก next() ให้อัตโนมัติ
//✅ Multer ตรวจสอบไฟล์ → ดึงไฟล์เข้า req.file → แล้วเรียก next() อัตโนมัติ
//❌ ถ้าไฟล์ผิดพลาด เช่น ไม่ใช่ image/*, Multer จะส่ง error ทันที และไม่ไปที่ next()