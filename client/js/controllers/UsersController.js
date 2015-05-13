app.controller('UsersController', function($scope, $routeParams, $localStorage, $location, UserFactory) {

	// set session data
	$scope.$storage = $localStorage;

	// get user's contacts
	var getContacts = function() {
		UserFactory.getContacts($localStorage.userId, function(data){ 
			$scope.current_user = data;
		});
	}
	getContacts();

	// create new user
	$scope.addUser = function(newUser) {
		UserFactory.addUser(newUser, function(data) {
			$localStorage.username = data.full_name;
			$localStorage.userId = data._id;
			$location.path('/home');
		});
	}

  // log-in user
	$scope.login = function(user) {
		UserFactory.login(user, function(result){
			if(result !=null) {
				$localStorage.username = result.full_name;
				$localStorage.userId = result._id;
				$scope.success = "Login successful!";
				$location.path('/home');
			}		
			else {
				$scope.error = "Invalid Email or Password";
			}
		});
	}

	// log-out user
	$scope.logout = function() {
    delete $localStorage.username;
    delete $localStorage.userId;
  };

  // create message
	$scope.create = function(newMessage){

		console.log(newMessage);
		UserFactory.create(newMessage, function(data){
			$scope.success = 'Message successfully sent!';
			$scope.newMessage = {};
		});
	}

	// create new contact
	$scope.add = function(newContact){
		newContact['userId'] = $localStorage.userId;
		UserFactory.add(newContact, function(data){
			$scope.success = "You added a new contact!";
			getContacts();
 		});
		$scope.newContact = {};
	}

	// destroy contact
	$scope.destroy = function(contact) {
		contact['current_user_id'] = $localStorage.userId;
		UserFactory.destroy(contact, function(data){
			$scope.success = "Contact successfully deleted";
			getContacts();
		});
	}

});