exports.init = function (req, res) {

	var User = req.app.db.base.models.User,
		passport = req._passport.instance;

	var username = req.body.username,
		password = req.body.password,
		name = req.body.name;

	var validate = function() {
		if (!username) {
			return res.send(400, 'Username required');
		}
		else if (!/^[a-zA-Z0-9\-\_]+$/.test(username)) {
			return res.send(400, 'Username only use letters, numbers, \'-\', \'_\'');
		}

		if (!password) {
			return res.send(400, 'Password required');
		}

		duplicateUserCheck();
	};
	
	var duplicateUserCheck = function() {
		User.findOne({ username: username }, function (err, doc) {
			if (err) return res.send(500, err);
			
			if (doc) {
				if (doc.username === username) {
					return res.send(400, 'Username already taken.');
				} else {
					return res.send(400, 'Email already taken.');
				}
			}

			createUser();
		});
	};
	
	var createUser = function() {
		User.create({
			username: username,
			password: req.app.db.base.models.User.encryptPassword(password),
			name: name,
		}, function(err, doc) {
			if (err) return res.send(500, err);
			
			signIn();
		});
	};
	
	var signIn = function() {
		passport.authenticate('local', function(err, user, info) {
			if (err) return res.send(500, err);
			
			if (!user) {
				return res.send(500, 'Sign in failed. That\'s strange.');
			} else {
				req.login(user, function(err) {
					if (err) return res.send(500, err);
			
					req.session.userId = user._id;
					user.password = undefined;
					user.email = undefined;
					res.send(200, { user: user });
				});
			}
		})(req, res);
	};
	
	validate();
};

exports.facebookSignUp = function(req, res, next) {
	var User = req.app.db.models.User,
		passport = req._passport.instance;

	var p = new User({ name: 'Test', password: 123, username: 'test' });
	p.save();
	
	passport.authenticate('facebook', { callbackURL: 'http://localhost:9000/facebook' }, function(err, user, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');

		User.findOne({ 'facebook.id': info.profile.id }, function(err, user) {
			if (err) return next(err);

			if (!user) {
				res.send(200, { user: info.profile });
			} else {
				res.send(400, { err: 'We found a user linked to your Facebook account.', user: user });
			}
		});
	})(req, res, next);
};