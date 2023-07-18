const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, world!');
});

server.listen(3000);
// Compare this snippet from src/server.js:
