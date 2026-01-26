const pdfService = require('../services/pdf.service');
const imageService = require('../services/image.service');
const wordService = require('../services/word.service');
const passwordService = require('../services/password.service');

exports.mergePdf = async (req, res) => {
  try {
    const pdf = await pdfService.mergePDFs(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ message: 'Merge failed' });
  }
};

exports.imageToPdf = async (req, res) => {
  try {
    const pdf = await imageService.imagesToPdf(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch {
    res.status(500).json({ message: 'Image to PDF failed' });
  }
};

exports.wordToPdf = async (req, res) => {
  try {
    const pdf = await wordService.wordToPdf(req.file.buffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch {
    res.status(500).json({ message: 'Word to PDF failed' });
  }
};

exports.removePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const pdf = await passwordService.removePassword(
      req.file.buffer,
      password
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch {
    res.status(400).json({ message: 'Invalid password' });
  }
};
