app.factory('UserFactory', function($http) {
	
	var factory = {};
	var contacts = [];

	// create user
	factory.addUser = function(newUser, callback) {
		$http.post('/users/create', newUser).success(function(data) {
			callback(data);
		});
	}

	// log-in user
	factory.login = function(user, callback){
		$http.post('/users/login', user).success(function(result){ 
			callback(result);
		});
	}

	// create message
	factory.create = function(message, callback){
		console.log('here');
		$http.post('/users/travelTime', message).success(function(data){
			message['CurrentTime'] = data.CurrentTime;
			$http.post('/users/createMessage', message).success(function(data) {
				callback(data);
			});
		});
	}

	// get all contacts
	factory.getContacts = function(id, callback) {
		$http.get('/users/'+ id).success(function(data) {
			callback(data);
		});
	}

	// add new contact
	factory.add = function(newContact, callback) {
		console.log('in factory for add');
		$http.post('/users/addContact', newContact).success(function(data){
			contacts.push(data);
			callback(contacts);
		});
	}

	// destroy contact
	factory.destroy = function(contact, callback) {
		$http.post('/users/destroy', contact).success(function(data){
			contacts.splice(contacts.indexOf(data), 1);
			callback(data);
		});
	}

	return factory;

});