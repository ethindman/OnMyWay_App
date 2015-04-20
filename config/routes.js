// var should be plural and lowercase
var users = require('./../server/controllers/users.js');

module.exports = function(app) {
	
	//get all contacts
	app.get('/users/:id', function(request, response){
		console.log('in routes');
		users.getContacts(request, response);

	});

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

	app.post('/users/addContact', function(request, response){
		console.log('in routes for add contact');
		users.addContact(request, response);

	})

	app.post('/users/destroy', function(request, response){
		users.destroy(request, response);
	})

};