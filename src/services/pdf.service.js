const { PDFDocument } = require('pdf-lib');

exports.mergePDFs = async (files) => {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdf = await PDFDocument.load(file.buffer,{ignoreEncryption:true});
    const pages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );
    pages.forEach(page => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
};
