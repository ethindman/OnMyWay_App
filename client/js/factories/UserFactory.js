app.factory('UserFactory', function($http) {
	
	var  users = [];
	var factory = {};

	// add user
	factory.addUser = function(newUser, callback) {
		$http.post('/users/create', newUser).success(function(data) {
			callback(data);
		});
	}

	factory.login = function(user, callback){
		$http.post('/users/login', user).success(function(result){ 
			callback(result);
		})
	}

	factory.create = function(message, callback){
		$http.post('/users/message', message).success(function(data){
			callback(data);
		})
	}


	return factory;

});