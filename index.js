require('dotenv/config');
const express = require('express');
const passport = require('passport');
const { port } = require('./config');
const api = require('./routes/api');
const auth = require('./routes/auth');
const mongodb = require('./database/mongo');

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api', api);
app.use('/auth', auth);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Api ready at http://localhost:${port}/api`);
  console.log(`movies ready at http://localhost:${port}/api/movies`);
  console.log(`watchlist ready at http://localhost:${port}/api/watchlist/username`);
  console.log(`login ready at http://localhost:${port}/auth/login`);
  console.log(`register ready at http://localhost:${port}/auth/register`);
});
