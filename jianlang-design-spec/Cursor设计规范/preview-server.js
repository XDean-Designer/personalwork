const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 8877;
const index = '剑琅联盟移动端设计规范.html';
const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.js': 'application/javascript' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/' + index;
  rel = rel.replace(/^\//, '').replace(/\.\./g, '');
  const file = path.join(root, rel);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found: ' + rel);
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => {
  console.log('http://127.0.0.1:' + port + '/');
  console.log('http://127.0.0.1:' + port + '/' + encodeURIComponent(index));
});
