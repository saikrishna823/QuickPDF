const { PDFDocument } = require('pdf-lib');

exports.imagesToPdf = async (files) => {
  const pdfDoc = await PDFDocument.create();
  const inputLength = files
  for (const file of files) {
    let image;
  if (file.mimetype === 'image/jpeg') {
    image = await pdfDoc.embedJpg(file.buffer);
  } else if (file.mimetype === 'image/png') {
    image = await pdfDoc.embedPng(file.buffer);
  } else {
    throw new Error(`Unsupported image type: ${file.mimetype}`);
  }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
  }

  return await pdfDoc.save();
};
