app.controller('UsersController', function($scope, $routeParams, $localStorage, $location, UserFactory) {

	// set session data
	$scope.$storage = $localStorage;

	if(!$routeParams.id) {
			UserFactory.getContacts($localStorage.userId, function(data){ 
				$scope.current_user = data;
		});
	}

	// $scope.test = function() {
	// 	console.log("got here");
	// 	console.log("This is local storage:", $localStorage);
	// 	console.log("This is username:", $localStorage.username);
	// 	console.log("This is userId:", $localStorage.userId);
	// 	console.log("This is scope.storage", $scope.$storage);
	// }

	$scope.addUser = function(newUser) {
		UserFactory.addUser(newUser, function(data) {
			$localStorage.username = data.full_name;
			$localStorage.userId = data._id;
			$location.path('/home');
		});
	}

	$scope.logout = function() {
    	delete $localStorage.username;
    	delete $localStorage.userId;
    	$location.path('/');
  	};

  	$scope.login = function(user) {
  		UserFactory.login(user, function(result){
  			if(result !=null)
			{
				$localStorage.username = result.full_name;
				$localStorage.userId = result._id;
				$location.path('/home');
			}		
			else
			{
				$scope.error = "Invalid Email or Password";
			}
  		});
  	}

  	$scope.create = function(newMessage){
  		UserFactory.create(newMessage, function(data){
  			$scope.success = 'Message successfully sent!';
  			$scope.newMessage = {};
  		});
  	}


  	$scope.add = function(newContact){
  		newContact['userId'] = $localStorage.userId;
  		UserFactory.add(newContact, function(data){
  			$scope.contacts = data;
  			$scope.newContact = {};
  			$scope.success = "You added a new contact!";
   		});
  	}

  	// destroy contact
  	$scope.destroy = function(contact) {
  		contact['current_user_id'] = $localStorage.userId;
  		UserFactory.destroy(contact, function(data){
  			$scope.success = "Contact successfully deleted";
  		});
  	}

});