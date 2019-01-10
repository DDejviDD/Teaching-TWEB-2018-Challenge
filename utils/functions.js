const Movietime = require('../database/models/Movietime');

function findMovies(skip, limit) {
  return Movietime.Movie.find({}, {}, { skip, limit });
}

function findWatchlist(user, skip, limit) {
  return Movietime.User.findOne({ username: user })
    .then(data => Movietime.Watchlist.find({ username: data }, {}, { skip, limit }));
}

function addMovieToWatchlist(user, movie) {
  return Movietime.User.create({ username: user, movie });
}

function authenticateUser(username, password) {
  return Movietime.User.findOne({ username, password });
}
function authenticateUserid(username) {
  return Movietime.User.findOne({ username });
}

function registerUser(username, password) {
  Movietime.User.findOne(username)
    .then((data) => {
      if (!(data !== null && data !== undefined)) {
        return Movietime.User.create(username, password);
      }
      return new Promise();
    });
}
module.exports = {
  findMovies,
  findWatchlist,
  addMovieToWatchlist,
  authenticateUser,
  registerUser,
  authenticateUserid,
};
