const multer = require('multer');

const storage = multer.memoryStorage(); // ⬅ in-memory only

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB
  },
  fileFilter: (_, file, cb) => {
    cb(null, true);
  }
});

module.exports = upload;
