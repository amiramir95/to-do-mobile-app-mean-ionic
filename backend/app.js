const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/task');

const listRoutes = require("./routes/list");

const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/to_do', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/lists", listRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
