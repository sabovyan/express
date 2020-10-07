const path = require('path');

let params;

const useMyRouteParams = (req, res, next) => {
  params = {
    param: req.params.param,
    header: req.headers,
    query: req.query,
    cookie: req.cookies,
  };
  next();
};

const getMyRouteParam = (req, res) => {
  let value;
  for (let [key, val] of Object.entries(params)) {
    if (key === req.params.param) {
      value = JSON.stringify(val);
    }
  }
  res.render(path.join(__dirname, '../pages/myroute.pug'), {
    title: req.params.param,
    value,
  });
};

module.exports = {
  useMyRouteParams,
  getMyRouteParam,
};
