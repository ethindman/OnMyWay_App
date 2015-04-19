// var should be plural and lowercase
var users = require('./../server/controllers/users.js');

module.exports = function(app) {
	
	// add user
	app.post('/users/create', function(request, response) {
		users.create(request, response);
	});

	app.post('/users/login', function(request, response){
		users.login(request, response);
	})

	app.post('/users/message', function(request, response){
		users.message(request, response);
	})

};