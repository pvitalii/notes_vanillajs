import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  const url = req.url;

  const sendFile = async (contentType, path) => {
    res.writeHead(200, { 'Content-Type': `${contentType}` });
    try {
      const fileContent = await fs.readFile(process.cwd() + path, { encoding: 'utf8' });
      res.end(fileContent)
    } catch (err) {
      console.error(err.message);
    }
  }

  switch (path.extname(url)) {
    case '.css':
      sendFile('text/css', url);
      break;
    
    case '.js':
      sendFile('text/javascript', url);
      break;
    
    case '.svg':
      sendFile('image/svg+xml', url);
      break;
    
    default:
      sendFile('text/html', '/notes.page.html');
      break;
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});