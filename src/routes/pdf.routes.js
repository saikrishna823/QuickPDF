const express = require('express');
const upload = require('../utils/multer');
const controller = require('../controllers/pdf.controller');

const router = express.Router();

router.post('/merge', upload.array('files'), controller.mergePdf);
router.post('/image-to-pdf', upload.array('files'), controller.imageToPdf);
router.post('/word-to-pdf', upload.single('file'), controller.wordToPdf);
router.post('/remove-password', upload.single('file'), controller.removePassword);

module.exports = router;
