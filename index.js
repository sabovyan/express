const path = require('path');
const fs = require('fs');
const express = require('express');
const pug = require('pug');

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/users/users.json'), {
    encoding: 'utf-8',
  })
);

function getUser(name, users) {
  let result;
  for (let user of users) {
    if (user.name.toLowerCase() === name.toLowerCase()) {
      result = Object.assign({}, user);
    }
  }
  return result;
}

const app = express();

app.set('view engine', 'pug');

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

app.use(function (req, res, next) {
  res
    .status(404)
    .render(path.join(__dirname, '/pages/404.pug'), { url: req.url });
});

app.listen(5000);

console.log('yo');
