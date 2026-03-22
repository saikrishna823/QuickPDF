const multer = require('multer');

const storage = multer.memoryStorage(); // ⬅ in-memory only
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB
  },
fileFilter: (_, file, cb) => {
  ALLOWED_MIME_TYPES.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error(`Unsupported file type: ${file.mimetype}`));
}
});

module.exports = upload;
