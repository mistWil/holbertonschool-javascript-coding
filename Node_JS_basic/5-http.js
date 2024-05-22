const http = require('http');
const countStudents = require('./3-read_file_async');

const databasePath = 'database.csv';
const port = 1245;

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      const response = await countStudents(databasePath);
      res.end(`This is the list of our students\n${response}`);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      console.error(error);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
