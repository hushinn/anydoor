const fs = require('fs');
const { promisify } = require('util');
// 转化为promise
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
module.exports = async function route(req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 是文件
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      // 是文件目录
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(files.join(','));
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end(`${filePath} is not a directory or file`);
  }
};
