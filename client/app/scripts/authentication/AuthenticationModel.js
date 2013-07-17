'use strict';

app.factory('AuthenticationModel', function ($http, $cookieStore) {

	this.user = $cookieStore.get('user');
	this.errorStatus = null;

	this.isSignedIn = function() {
		return !!this.user;
	};

	this.setUser = function(user) {
		this.errorStatus = null;
		this.user = user;
		$cookieStore.put('user', user);
	};

	this.removeUser = function() {
		this.user = null;
		$cookieStore.remove('user');
	};

	return this;

});