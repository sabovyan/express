const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { getUser, getTime } = require('./helper/function.helper');
const {
  getTimeFromAPI,
  postUserToAPI,
  getUsersFromAPI,
} = require('./helper/api.helper');

const { getALLProfiles, getProfile } = require('./helper/profile.helper');

const userData = [];
const app = express();
let params;

app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static('assets'));

app.use('/', function (req, res, next) {
  const time = JSON.stringify(getTime());
  res.cookie('time', time);
  next();
});

app.get('/', (req, res) => {
  const time = JSON.parse(req.cookies.time);
  res.render(path.join(__dirname, '/pages/index.pug'), {
    time,
  });
});

app.use('/myroute/:param', function (req, res, next) {
  params = {
    param: req.params.param,
    header: req.headers,
    query: req.query,
    cookie: req.cookies,
  };
  console.log(params);
  next();
});

app.get('/myroute/:param', (req, res) => {
  let value;
  for (let [key, val] of Object.entries(params)) {
    if (key === req.params.param) {
      value = JSON.stringify(val);
    }
  }
  res.render(path.join(__dirname, '/pages/myroute.pug'), {
    title: req.params.param,
    value,
  });
});

/* profiles */

app.get('/profiles', getALLProfiles);
app.get('/profiles/:name', getProfile);

/* Form */
app.get('/form', (req, res) => {
  res.render(path.join(__dirname, '/pages/form.pug'));
});

app.post('/form', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    agreed: req.body.agree ? true : false,
  };
  userData.push(user);

  res.redirect('/result');
});

app.get('/result', (req, res) => {
  const resultData = JSON.stringify(userData);
  res.send(resultData);
});

/* API */

app.get('/api/time', getTimeFromAPI);

app.post('/api/users', postUserToAPI);

app.get('/api/users', getUsersFromAPI);

// 404
app.use(function (req, res, next) {
  res
    .status(404)
    .render(path.join(__dirname, '/pages/404.pug'), { url: req.url });
});

app.listen(5000, () => console.log('port: 5000'));
