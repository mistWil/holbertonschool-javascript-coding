#!/usr/bin/node

const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const filePath = process.argv[2];
    readDatabase(filePath)
      .then((fields) => {
        let responseText = 'This is the list of our students\n';
        // const totalStudents =
        // Object.values(fields).reduce((acc, field) => acc + field.length, 0);
        // responseText += `Number of students: ${totalStudents}\n`;

        for (const [field, students] of Object.entries(fields).sort()) {
          responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }

        res.status(200).send(responseText.trim());
      })
      .catch(() => res.status(500).send('Cannot load the database'));
  }

  static getStudentsByMajor(req, res) {
    const filePath = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(filePath)
      .then((fields) => {
        const students = fields[major] || [];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
