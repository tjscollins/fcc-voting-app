'use strict';
/*eslint-disable require-jsdoc*/
const path = process.cwd();
const PollModel = require(path + '/server/models/polls');

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log('Unauthenticated access!');
      res.redirect('/login');
    }
  }

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
    .route('/createPoll')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    })
    .post(function(req, res) {
      if (!req.body) {
        res
          .status(400)
          .send();
      }
      let poll = new PollModel(req.body);
      poll
        .save()
        .then((doc) => {
          res.send(doc);
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    });

  app
    .route('/api/polls')
    .get(function(req, res) {
      PollModel
        .find({})
        .then((polls) => {
          console.log(polls);
          res.send(polls);
        });
    });

  app
    .route('/api/poll:id')
    .get(function(req, res) {
      PollModel
        .find({_id: req.params.id})
        .then((polls) => {
          console.log(polls);
          res.send(polls[0]);
        });
    });

  app
    .route('/poll:id')
    .get((req, res) => {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/api/me')
    .get(isLoggedIn, function(req, res) {
      console.log('/api/me', req.user);
      res.json(req.user);
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
};
