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
			$location.path(DefaultRoute);
		}).error(function (data, status) {
			AuthenticationModel.removeUser();
			AuthenticationModel.errorStatus = status;
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
		}).error(function (data, status) {
			AuthenticationModel.removeUser();
			AuthenticationModel.errorStatus = status;
		});
	};

	$scope.facebookRequestToken = function () {
		return $http.get('http://localhost:3000/api/auth/signup/facebook')
			.success(function(url) {
				$window.location.href = url;
			});
	};

	$scope.facebookSignUp = function () {
		return $http.get('http://localhost:3000/api/auth/signup/facebook/callback', {
				params: $location.search()
			}).success(angular.bind(this, function(data) {
				console.log('DATA!!!!', data.user);
				AuthenticationModel.setUser(data.user);
				$location.search('code', null); // Remove token from Url.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path('/private'); // Redirect to the private page.
			})).error(function() {
				$location.search('code', null);
				$location.path('/signup')
			});
	};

	$scope.clear = function () {
		// Development placeholders.
		$scope.username = 'pablodenadai';
		$scope.password = '123';
		$scope.name = 'Pablo De Nadai';
		AuthenticationModel.errorStatus = null;
	};

});