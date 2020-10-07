const { getTime } = require('./function.helper');

const userData = [];
const getTimeFromAPI = (req, res) => {
  const result = {
    time: getTime(),
  };
  res.send(JSON.stringify(result));
};

const postUserToAPI = (req, res) => {
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
};

const getUsersFromAPI = (req, res) => {
  res.send(JSON.stringify(userData));
};

module.exports = {
  getTimeFromAPI,
  postUserToAPI,
  getUsersFromAPI,
};
