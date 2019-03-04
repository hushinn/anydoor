const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const Handlebars = require('handlebars');
const config = require('../config/defaultConf');
const mime = require('./mime');
const compress = require('./compress');

// 转化为promise
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// 处理模板
const tplPath = path.resolve(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function route(req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 是文件
      const contentType = mime(filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', contentType);
      let rs = fs.createReadStream(filePath, 'utf8');
      // 压缩
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      // 是文件目录
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      const relativePath = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir  : relativePath ? `/${relativePath}` : '',
        files,
      };
      res.end(template(data));
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end(`${filePath} is not a directory or file`);
  }
};
