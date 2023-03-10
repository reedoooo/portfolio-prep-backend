"use strict";

const axios = require("axios");

function getProjects(req, res, next) {
  let project = req.query.searchQuery;
  let projectURL = `https://raw.githubusercontent.com/reedoooo/portfolio-prep/main/public/${project}`;

  axios
    .get(moviesUrl)
    .then((response) => {
      let liveInfo = response.data.results.map((movie) => new Movies(movie));
      res.status(200).send(liveInfo);
    })
    .catch((error) => next(error));
}

// create a movies class so we can store info in it
class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.average_votes;
    (this.posterImgPath = `https://image.tmdb.org/t/p/w500//${movie.posterImgPath}`),
      (this.popularity = movie.popularity);
    this.released_on = movie.release_date;
  }
}

module.exports = getMovies;
