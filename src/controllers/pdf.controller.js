const pdfService = require('../services/pdf.service');
const imageService = require('../services/image.service');
//const wordService = require('../services/word.service');
const passwordService = require('../services/password.service');

exports.mergePdf = async (req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
  }
  try {
    const pdf = await pdfService.mergePDFs(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch (error)  {
    console.error('[mergePdf]', error);
    res.status(500).json({ message: 'Merge failed' });
  }
};

exports.imageToPdf = async (req, res) => {
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
  }
  try {
    const pdf = await imageService.imagesToPdf(req.files);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch (error)  {
    console.error('[imagesToPdf]',error);
    res.status(500).json({ message: 'Image to PDF failed' });
  }
};

exports.removePassword = async (req, res) => {
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
  }
  try {
    const { password } = req.body;
    const pdf = await passwordService.removePassword(
      req.file.buffer,
      password
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch (error) {
    console.error('[removePassword]',error);
    res.status(400).json({ message: 'Invalid password' });
  }
};

/*exports.wordToPdf = async (req, res) => {
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
  }
  try {
    const pdf = await wordService.wordToPdf(req.file.buffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.send(pdf);
  } catch (error) {
    console.error('[wordToPdf]' , error);
    res.status(500).json({ message: 'Word to PDF failed' });
  }
}; */