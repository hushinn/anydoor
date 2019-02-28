const http = require('http');
/* eslint-disable */
const chalk = require('chalk');
/* eslint-enable */
const path = require('path');

const { root, hostName, port } = require('./config/defaultConf');
const route = require('./helper/route');


const server = http.createServer((req, res) => {
  // 拼接请求路径
  const filePath = path.join(root, req.url);
  // 处理逻辑
  route(req, res, filePath);
});

server.listen(port, hostName, () => {
  const addr = `http://${hostName}:${port}`;
  console.info(`This server is serve on ${chalk.green(addr)}`);
});
