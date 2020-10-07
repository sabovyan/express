const fs = require('fs');
const path = require('path');

const { getUser, getTime } = require('../helper/function.helper');

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../users/users.json'), {
    encoding: 'utf-8',
  })
);

const getALLProfiles = (req, res) => {
  res.render(path.join(__dirname, '../pages/profiles.pug'), { users });
};

const getProfile = (req, res) => {
  const requestedName = req.params.name;

  const user = getUser(requestedName, users);
  if (user) {
    res.render(path.join(__dirname, '../pages/profile.pug'), {
      user,
    });
  } else {
    res.status(500).send('this page is not found');
  }
};

module.exports = {
  getALLProfiles,
  getProfile,
};
