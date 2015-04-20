var app = angular.module('lateApp', ['ngRoute', 'ngStorage']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'UsersController'
	})
	.when('/register', {
		templateUrl: 'partials/registration.html',
		controller: 'UsersController'
	})
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'UsersController'
	})
	.when('/:id', {
		templateUrl: 'partials/contacts.html',
		controller: 'UsersController'
	})
	.when('/contacts', {
		templateUrl: 'partials/contacts.html',
		controller: 'UsersController'
	})

	.otherwise({
		redirectTo: '/'
	});
});
