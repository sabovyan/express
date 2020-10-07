const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { getTime } = require('./helper/function.helper');
const {
  getTimeFromAPI,
  postUserToAPI,
  getUsersFromAPI,
} = require('./helper/api.helper');

const { getALLProfiles, getProfile } = require('./helper/profile.helper');
const {
  useMyRouteParams,
  getMyRouteParam,
} = require('./helper/myroute.helper');

const { getForm, postForm, getResult } = require('./helper/form.helper');

const userData = [];
const app = express();

app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

/* myroute */
app.use('/myroute/:param', useMyRouteParams);
app.get('/myroute/:param', getMyRouteParam);

/* profiles */
app.get('/profiles', getALLProfiles);
app.get('/profiles/:name', getProfile);

/* Form */
app.get('/form', getForm);
app.post('/form', postForm);

app.get('/result', getResult);

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
