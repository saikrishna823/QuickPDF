const pdfService = require('../services/pdf.service');
const imageService = require('../services/image.service');
const wordService = require('../services/word.service');
const passwordService = require('../services/password.service');

exports.wordToPdf = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
};

exports.mergePdf = async (req, res) => {
  try {
    const pdf = await pdfService.mergePDFs(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch (err) {
    console.error('[mergePdf]', err);
    res.status(500).json({ message: 'Merge failed' });
  }
};

exports.imageToPdf = async (req, res) => {
  try {
    const pdf = await imageService.imagesToPdf(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch {
    console.error('[imagesToPdf]', err);
    res.status(500).json({ message: 'Image to PDF failed' });
  }
};

exports.wordToPdf = async (req, res) => {
  try {
    const pdf = await wordService.wordToPdf(req.file.buffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch {
    console.error('[wordToPdf]', err);
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
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch {
    console.error('[removePassword]', err);
    res.status(400).json({ message: 'Invalid password' });
  }
};
