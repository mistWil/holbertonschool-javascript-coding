#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];
const characterId = 18; // Wedge Antilles

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const films = JSON.parse(body).results;
    const filmCount = films.reduce((count, film) => {
      const characters = film.characters;
      if (characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
        return count + 1;
      }
      return count;
    }, 0);
    console.log(filmCount);
  }
});
