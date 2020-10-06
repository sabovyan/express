const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/home' || req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream(path.join(__dirname, '/index.html')).pipe(res);
  } else if (req.url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream(path.join(__dirname, '/about.html')).pipe(res);
  } else if (req.url === '/api/find%me') {
    res.writeHead(200, { 'content-type': 'application/json' });
    const data = {
      date: new Date(),
      text: 'yep this is the hidden text',
      heading: "Ain't nobody",
    };
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    fs.createReadStream(path.join(__dirname, '/404.html')).pipe(res);
  }
});

server.listen(5000, '127.0.0.1');
console.log('yo');
