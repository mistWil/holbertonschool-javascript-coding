const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const students = data.trim().split('\n').filter((student) => student);
        const fields = {};

        students.forEach((student) => {
          const [firstName, field] = student.split(',');
          if (fields[field]) {
            fields[field].push(firstName);
          } else {
            fields[field] = [firstName];
          }
        });

        resolve(fields);
      }
    });
  });
}

export default readDatabase;
