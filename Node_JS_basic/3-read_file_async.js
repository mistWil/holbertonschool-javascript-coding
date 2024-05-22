const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }

      const lines = data.trim().split('\n');

      let csCount = 0;
      let sweCount = 0;
      const csList = [];
      const sweList = [];

      for (const line of lines) {
        const fields = line.split(',');
        const [firstName, lastName, age, field] = fields;

        if (firstName && lastName && age && field) {
          if (field === 'CS') {
            csCount += 1;
            csList.push(firstName);
          } else if (field === 'SWE') {
            sweCount += 1;
            sweList.push(firstName);
          }
        }
      }

      console.log(`Number of students: ${csCount + sweCount}`);
      console.log(`Number of students in CS: ${csCount}. List: ${csList.join(', ')}`);
      console.log(`Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`);

      resolve();
    });
  });
}

module.exports = countStudents;
