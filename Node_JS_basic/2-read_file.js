const fs = require('fs');

module.exports = function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf8').trim();
    const lines = content.split('\n');

    let sweCount = 0;
    let csCount = 0;

    const sweList = [];
    const csList = [];

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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};
