const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.user_register = (req, res) => {
	const { name, email, password, password2 } = req.body;
	const errors = [];

	// Check required fileds
	if (!name || !email || !password || !password2) {
		errors.push({msg: 'Please fill in all fields' });
	}

	// Check passwords match
	if (password != password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	// Check password length
	if (password.length < 6) {
		errors.push({ msg: 'Password should be at least 6 characters' });
	}

	if (errors.length > 0) {
		console.log(errors);
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		// Validation pass
		User.findOne({ email: email }).then(user => {
				if(user) {
					// User exists
					errors.push({msg: 'Email already Registered'});
					res.render('register', {
						errors,
						name,
						email,
						password,
						password2
					});
				} else {
					// Validation pass
					const newUser = new User({
						_id: new mongoose.Types.ObjectId(),
						username: name,
						email,
						password
					});
					// Hash password
					bcrypt.genSalt(10,(err, salt) =>
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							// Set password to hashed
							newUser.password = hash;
							// Save user
							newUser.save()
								.then(user => {
									req.flash('success_msg', 'You are now registered and can log in');
									res.redirect('/users/login');
								})
								.catch(err => console.log(err));
						}));
				}
			});
	}
}

exports.user_login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
}

exports.user_logout = (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
}