const mongoose = require('mongoose');
const express = require('express');

const app = express();

// Remote
const mongodbUri = process.env.DB_URL;
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  console.log('connected to a database');
});

// MongoDb Promises depreciated
mongoose.Promise = global.Promise;

// DB error handling
app.use((err, req, res, next) => {
  if (!err.status) {
    next(err);
  }
  const error = new Error('DB Error : ');
  error.status = 422;
  next(error);
});
