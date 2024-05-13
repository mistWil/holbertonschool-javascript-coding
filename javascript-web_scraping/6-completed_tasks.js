#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const tasks = JSON.parse(body);
    const completedTasksByUser = tasks.reduce((acc, task) => {
      if (task.completed) {
        if (acc[task.userId]) {
          acc[task.userId]++;
        } else {
          acc[task.userId] = 1;
        }
      }
      return acc;
    }, {});

    console.log(completedTasksByUser);
  }
});
