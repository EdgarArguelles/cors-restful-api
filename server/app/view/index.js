var userView = require('./UserView'),
	passport = require('passport');

exports = module.exports = function(app) {

	// Authentication
	app.post('/api/auth/signin', require('./SignInView').init);
	app.post('/api/auth/signup', require('./SignUpView').init);
	app.get('/api/auth/signout', require('./SignOutView').init);

	app.get('/api/auth/signup/facebook', passport.authenticate('facebook', { callbackURL: 'http://localhost:9000/signupfacebook' }));
	app.get('/api/auth/signup/facebook/callback', require('./SignUpView').facebookSignUp);
	app.get('/api/auth/signin/facebook', passport.authenticate('facebook', { callbackURL: 'http://localhost:9000/signinfacebook' }));
	app.get('/api/auth/signin/facebook/callback', require('./SignInView').facebookSignIn);

	// Methods
	app.get('/api/user', userView.get);

};