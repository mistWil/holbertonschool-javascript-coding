const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const databasePath = process.argv[2];
    if (!databasePath) {
      res.send('Cannot load the database');
      return;
    }

    res.write('This is the list of our students\n');
    await countStudents(databasePath);
    res.end();
  } catch (err) {
    res.send('Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
