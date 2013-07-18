'use strict';

app.controller('AuthenticationCtrl', function ($scope, $http, $location, $window, AuthenticationModel) {

	$scope.username = null;
	$scope.password = null;
	$scope.name = null;

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signIn = function (username, password) {
		return $http.post('http://localhost:3000/api/auth/signin', {
			username: username,
			password: password
		}).success(function(data) {
			AuthenticationModel.setUser(data.user);
			$location.path('/private');
		}).error(function (data) {
			AuthenticationModel.removeUser();
			AuthenticationModel.errorMessage = data;
		});
	};

	$scope.signUp = function (username, password, name, email) {
		return $http.post('http://localhost:3000/api/auth/signup', {
			username: username,
			password: password,
			name: name,
			email: email
		}).success(function(data) {
			AuthenticationModel.setUser(data.user);
			$location.path('/private');
		}).error(function (data) {
			AuthenticationModel.removeUser();
			AuthenticationModel.errorMessage = data;
		});
	};

	$scope.signFacebook = function () {
		var search = $location.search(),
			action = search.action;

		if (action === 'signin') {
			$scope.signInFacebook();
		} else if (action === 'signup') {
			$scope.signUpFacebook();
		}
	};

	$scope.signUpFacebookRequestToken = function () {
		return $http.get('http://localhost:3000/api/auth/signup/facebook')
			.success(function(url) {
				$window.location.href = url;
			});
	};

	$scope.signUpFacebook = function () {
		return $http.get('http://localhost:3000/api/auth/signup/facebook/callback', {
				params: $location.search()
			}).success(function(data) {
				AuthenticationModel.setUser(data.user);
				$location.search('code', null); // Remove token from Url.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path('/private'); // Redirect to the private page.
			}).error(function(data) {
				AuthenticationModel.errorMessage = data;
				$location.search('code', null); // Remove token from Url.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path('/signup');
			});
	};

	$scope.signInFacebookRequestToken = function () {
		return $http.get('http://localhost:3000/api/auth/signin/facebook')
			.success(function(url) {
				$window.location.href = url;
			});
	};

	$scope.signInFacebook = function () {
		return $http.get('http://localhost:3000/api/auth/signin/facebook/callback', {
				params: $location.search()
			}).success(function(data) {
				AuthenticationModel.setUser(data.user);
				$location.search('code', null); // Remove token from Url.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path('/private'); // Redirect to the private page.
			}).error(function(data) {
				AuthenticationModel.errorMessage = data;
				$location.search('code', null); // Remove token from Url.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path('/signup');
			});
	};

});