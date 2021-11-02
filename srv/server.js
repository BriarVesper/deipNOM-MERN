let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let database = require('./database/db');
let createError = require('http-errors');

let recipeRoute = require('./routes/recipe.routes');

mongoose.Promise = global.Promise;
mongoose.connect(database.db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Open the pod bay doors please, Hal.')
  }, error => {
    console.log('Could not connect to DB : ' + error)
  }
);

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static('assets'));

app.use('/recipes', recipeRoute);

let port = 8081;
app.listen(port, () => {
  console.log('Connected to port:' + port)
});

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(err.statusCode).send(err.message);
});