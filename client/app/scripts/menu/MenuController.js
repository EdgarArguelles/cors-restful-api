'use strict';

app.controller('MenuCtrl', function ($scope, $location, $http, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signOut = function () {
		AuthenticationModel.removeUser();
		$location.path('/');
		return $http.get('http://localhost:3000/api/auth/signout');
	};

});