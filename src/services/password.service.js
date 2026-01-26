const { PDFDocument } = require('pdf-lib');

exports.removePassword = async (buffer, password) => {
  const pdf = await PDFDocument.load(buffer, { password });
  return await pdf.save();
};
