'use strict';
/*eslint-disable require-jsdoc*/

const path = process.cwd();
const ClickHandler = require(path + '/server/controllers/clickHandler.server.js');
const {getUserData} = require(path + '/server/controllers/userController.client.js');

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  let clickHandler = new ClickHandler();

  app
    .route('/')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/login')
    .get(function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app
    .route('/profile')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/poll:id')
    .get((req, res) => {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/api/:id')
    .get(isLoggedIn, function(req, res) {
      res.json(req.user.github);
    });

  app
    .route('/auth/github')
    .get(passport.authenticate('github'));

  app
    .route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  app
    .route('/auth/google')
    .get(passport.authenticate('google', {scope: ['openid profile email']}));

  app
    .route('/auth/google/callback*')
    .get(passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  app.route('/api/:id/').get(isLoggedIn, getUserData);

  app
    .route('/api/:id/clicks')
    .get(isLoggedIn, clickHandler.getClicks)
    .post(isLoggedIn, clickHandler.addClick)
    .delete(isLoggedIn, clickHandler.resetClicks);
};
