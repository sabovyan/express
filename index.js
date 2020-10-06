const path = require('path');
const fs = require('fs');
const express = require('express');
const getUser = require('./helper/user.helper');

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/users/users.json'), {
    encoding: 'utf-8',
  })
);

const app = express();

app.set('view engine', 'pug');

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/pages/index.pug'));
});

app.get('/profiles', (req, res) => {
  res.render(path.join(__dirname, '/pages/profiles.pug'), { users });
});

app.get('/profiles/:name', (req, res) => {
  const requestedName = req.params.name;
  const user = getUser(requestedName, users);

  res.render(path.join(__dirname, '/pages/profile.pug'), {
    user,
  });
});

// app.use(function (req, res, next) {
//   res
//     .status(404)
//     .render(path.join(__dirname, '/pages/404.pug'), { url: req.url });
// });

app.listen(5000);

console.log('yo');
