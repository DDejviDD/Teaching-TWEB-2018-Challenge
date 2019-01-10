const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  vote_count: Number,
  video: Boolean,
  vote_average: Number,
  title: String,
  popularity: Number,
  poster_path: String,
  original_language: String,
  original_title: String,
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: String,
  tmdb_id: Boolean,
  genres: [String],
});

const UserSchema = new Schema({
  username: String,
  password: String,
});

const WatchlistSchema = new Schema({
  username: UserSchema,
  movies: [MovieSchema],
});

const Movie = mongoose.model('Movie', MovieSchema);
const User = mongoose.model('User', UserSchema);
const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = {
  Movie,
  User,
  Watchlist,
};
