const express = require('express');
const passport = require('passport');
const functions = require('../utils/functions');

const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });

router.get('/movies', (req, res, next) => {
  functions.findMovies(0, 20)
    .then(datas => res.send(datas))
    .catch(next);
});

router.get('/watchlist/:user', (req, res, next) => {
  const user = req.params.user;

  functions.findWatchlist(user, 0, 20)
    .then(datas => res.send(datas))
    .catch(next);
});

router.get('/private', authenticated(), (req, res) => {
  res.send({ message: 'Hey this is a private message!' });
});

module.exports = router;
