var userView = require('./UserView'),
	passport = require('passport');

exports = module.exports = function(app) {

	// Authentication
	app.post('/api/auth/signin', require('./SignInView').init);
	app.post('/api/auth/signup', require('./SignUpView').init);
	app.get('/api/auth/signout', require('./SignOutView').init);

	// Fix hardcoded host origin
	app.get('/api/auth/signup/facebook', passport.authenticate('facebook', { callbackURL: 'http://localhost:9000/facebook' }));
	app.get('/api/auth/signup/facebook/callback', require('./SignUpView').facebookSignUp);

	// Methods
	app.get('/sapi/user', userView.get);

};