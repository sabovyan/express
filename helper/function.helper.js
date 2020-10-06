function getUser(name, users) {
  let result;
  for (let user of users) {
    if (user.name.toLowerCase() === name.toLowerCase()) {
      result = Object.assign({}, user);
    }
  }
  return result;
}

function getDate() {
  const date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  if (hh < 10) {
    hh = `0${hh}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (ss < 10) {
    ss = `0${ss}`;
  }

  return `${hh}:${mm}:${ss}`;
}

module.exports = {
  getUser,
  getDate,
};
