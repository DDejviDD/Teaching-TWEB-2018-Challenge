const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const functions = require('../utils/functions');
const { jwtOptions } = require('../config');


const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// find user by password and username
passport.use(new LocalStrategy(
  {
    // parameter to look
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    const USER = functions.authenticateUser(username, password);
    if (username === USER.username && password === USER.password) {
      return done(null, USER.username);
    }
    return done(null, false);
  },
));

// find user with his token
passport.use(new JWTStrategy(
  {
    secretOrKey: jwtOptions.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    const { userId } = jwtPayload;
    const USER = functions.authenticateUserid(userId);
    if (userId !== USER.id) {
      return done(null, false);
    }
    return done(null, USER.id);
  },
));

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  functions.registerUser(username, password).then((data) => {
    if (data.username === username) {
      res.sendStatus(201);
    }
  });
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  functions.authenticateUser(username, password).then((data) => {
    if (data.username === username) {
      const token = jwt.sign({ userId: username }, jwtOptions.secret);
      res.send({ user, token });
    } else {
      res.sendStatus(403);
    }
  });
});

router.use((req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwtOptions.secret, (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ token });
    }
  });
  next();
});

module.exports = router;
