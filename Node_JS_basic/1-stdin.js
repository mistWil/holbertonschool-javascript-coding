process.stdin.setEncoding('utf8');

const string = 'Welcome to Holberton School, what is your name?';
process.stdout.write(`${string}\n`);
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`Your name is: ${chunk}`);
    process.stdout.write('This important software is now closing\n');
  }
});
