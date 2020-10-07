const path = require('path');

const userData = [];

const getForm = (req, res) => {
  res.render(path.join(__dirname, '../pages/form.pug'));
};

const postForm = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    agreed: req.body.agree ? true : false,
  };
  userData.push(user);

  res.redirect('/result');
};

const getResult = (req, res) => {
  const resultData = JSON.stringify(userData);
  res.send(resultData);
};

module.exports = {
  getForm,
  postForm,
  getResult,
};
