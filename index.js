const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { getUser, getTime } = require('./helper/function.helper');

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/users/users.json'), {
    encoding: 'utf-8',
  })
);
const userData = [];

const app = express();

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

// app.use('/myroute', function (req, res, next) {
//   next();
// });

// app.get('/myroute/:param', (req, res) => {
//   console.log(req.params.param);
//   // console.log(req.query());
//   // console.log(req.cookies);
//   console.log(typeof req.params.param);
//   res.render(path.join(__dirname, '/pages/myroute.pug'), {
//     title: req.params.param,
//   });
// });

app.get('/profiles', (req, res) => {
  res.render(path.join(__dirname, '/pages/profiles.pug'), { users });
});

app.get('/profiles/:name', (req, res) => {
  const requestedName = req.params.name;

  const user = getUser(requestedName, users);
  if (user) {
    res.render(path.join(__dirname, '/pages/profile.pug'), {
      user,
    });
  } else {
    res.status(500).send('this page is not found');
  }
});

app.get('/form', (req, res) => {
  res.render(path.join(__dirname, '/pages/form.pug'), { users });
});

app.post('/form', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    agreed: req.body.agree ? true : false,
  };
  userData.push(user);
  console.log(user);
  res.redirect('/result');
});

app.get('/result', (req, res) => {
  const resultData = JSON.stringify(userData);
  res.send(resultData);
});

/* API */

app.get('/api/time', (req, res) => {
  const result = {
    time: getTime(),
  };
  res.send(JSON.stringify(result));
});
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const { gender } = req.body;
  const { agree } = req.body;
  const { password } = req.body;
  if (typeof username !== 'string') {
    throw new Error('the username value is not valid');
  }
  if (typeof gender !== 'string') {
    throw new Error('the gender value is not valid');
  }
  if (typeof agree !== 'boolean') {
    throw new Error('the agree value is not valid');
  }
  if (typeof password !== 'string') {
    throw new Error('the password value is not valid');
  }
  const user = {
    username,
    gender,
    agree,
    password,
  };
  userData.push(user);
  res.send(JSON.stringify(userData));
});

app.get('/api/users', (req, res) => {
  res.send(JSON.stringify(userData));
});

// 404
app.use(function (req, res, next) {
  res
    .status(404)
    .render(path.join(__dirname, '/pages/404.pug'), { url: req.url });
});

app.listen(5000, () => console.log('y.o.'));
