const path = require('path');
const fs = require('fs');
const express = require('express');
const pug = require('pug');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/index.pug'));
});

app.get('/profile/:name', (req, res) => {
  // res.render(path.join(__dirname, '/profile.pug'), );

  res.render(path.join(__dirname, '/profile.pug'), { name: req.params.name });
});
app.use(function (req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
    res.render(path.join(__dirname, '/404.pug'), { url: req.url });
  }
});

app.listen(5000);

console.log('yo');
