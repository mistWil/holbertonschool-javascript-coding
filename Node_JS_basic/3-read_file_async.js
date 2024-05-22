const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFileAsync(path, 'utf8')
      .then((data) => {
        const students = data.trim().split('\n').filter((student) => student);
        const fields = {};
        const fieldNames = {};

        students.forEach((student) => {
          const [firstName, field] = student.split(',');
          if (fields[field]) {
            fields[field].push(firstName);
          } else {
            fields[field] = [firstName];
            fieldNames[field] = field;
          }
        });

        console.log(`Number of students: ${students.length}`);
        for (const field in fieldNames) {
          if (Object.prototype.hasOwnProperty.call(fieldNames, field)) {
            console.log(
              `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
            );
          }
        }
        resolve();
      })
      .catch(() => {
        reject(new Error('Cannot load the database'));
      });
  });
}

module.exports = countStudents;
