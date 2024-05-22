const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8').trim().split('\n');
    const students = data.filter((student) => student);
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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
