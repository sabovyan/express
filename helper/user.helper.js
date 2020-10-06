function getUser(name, users) {
  let result;
  for (let user of users) {
    if (user.name.toLowerCase() === name.toLowerCase()) {
      result = Object.assign({}, user);
    }
  }
  return result;
}

module.exports = getUser;
