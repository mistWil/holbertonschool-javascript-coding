#!/usr/bin/node

const express = require('express');

const app = express();
const port = 1245;
const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));
    const fields = {};

    students.forEach((student) => {
      const field = student[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    });

    resolve(fields);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  countStudents(databasePath)
    .then((fields) => {
      let responseText = 'This is the list of our students\n';
      const totalStudents = Object.values(fields).reduce((acc, field) => acc + field.length, 0);
      responseText += `Number of students: ${totalStudents}\n`;

      for (const [field, students] of Object.entries(fields)) {
        responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      res.send(responseText.trim());
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
