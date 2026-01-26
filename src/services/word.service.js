const libre = require('libreoffice-convert');
const util = require('util');

libre.convertAsync = util.promisify(libre.convert);

exports.wordToPdf = async (buffer) => {
  return await libre.convertAsync(buffer, '.pdf');
};
