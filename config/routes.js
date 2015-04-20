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

	// login user
	app.post('/users/login', function(request, response){
		users.login(request, response);
	})

	// get estimate travel time
	app.post('/users/travelTime', function(request, response){
		users.travelTime(request, response);
	});

	app.post('/users/createMessage', function(request, response) {
		users.createMessage(request, response);
	});

	// add contact
	app.post('/users/addContact', function(request, response){
		users.addContact(request, response);
	});

	// destroy contact
	app.post('/users/destroy', function(request, response){
		users.destroy(request, response);
	});

};