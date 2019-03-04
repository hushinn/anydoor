const path = require('path');

const mime = {
  gif : 'image/gif',
  png : 'image/png',
  jpe : 'image/jpeg',
  jpeg: 'image/jpeg',
  jpg : 'image/jpeg',
  txt : 'text/plain',
  xml : 'text/xml',
  html: 'text/html',
  css : 'text/css',
  js  : 'text/javascript',
};

module.exports = (filePath) => {
  const extName = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();
  if (!extName) {
    return mime.txt;
  }
  return mime[extName] || mime.txt;
};
