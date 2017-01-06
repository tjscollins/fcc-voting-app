'use strict';

const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL,
	},
	(token, refreshToken, profile, done) => {
		process.nextTick(function() {
			User.findOne({'github.id': profile.id}, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					let newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL,
	},
	(token, refreshToken, profile, done) => {
		process.nextTick(function() {
			User.findOne({'google.id': profile.id}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					let newUser = new User();
					// console.log(profile);
					newUser.google.id = profile.id;
					newUser.google.username = profile.emails[0].value;
					newUser.google.displayName = profile.displayName;

					newUser.save(function(err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
