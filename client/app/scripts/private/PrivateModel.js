'use strict';

app.factory('PrivateModel', function ($http) {

	this.collection = null;
	
	this.getUserCollection = function () {
		return $http.get('http://localhost:3000/api/user')
			.success(angular.bind(this, function (data) {
				this.collection = data;
			}))
			.error(angular.bind(this, function (data) {
				this.collection = null;
			}));
	};

	return this;

});