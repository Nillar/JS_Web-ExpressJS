const controllers = require('../controllers');

module.exports = app => {
  app.get('/', controllers.home.get);
  app.get('/users/register', controllers.user.register.get);
  app.post('/users/register', controllers.user.register.post);
  app.post('/users/logout', controllers.user.logout);
  app.get('/users/login', controllers.user.login.get);
  app.post('/users/login', controllers.user.login.post);
  app.get('/users/find', controllers.user.find);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  })
};
