//server side controller

var mongoose = require('mongoose');
// var should be singular and capitalized
var User = mongoose.model('User');

var nodemailer = require('nodemailer');

module.exports = (function (){
	return {

		//get all contacts
		getContacts: function(request, response){
			var id = request.params.id;
			// if(request.params.id.match(/^[0-9a-fA-F]{24}$/)){
				User.findById(id, function(err, data){
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('user found');
						response.json(data);
					}
				});
		  	// }
		},
	
		// add user
		create: function(request, response) {

			var user = new User(request.body);

			var contact = {
				full_name: request.body.contactName,
				email: request.body.contactEmail
			}

			user.save(function(error, data) {
				if(error) {
					console.log(error);
				}
				else {
					console.log("User added!");
					
					var id = data._id;

					User.findByIdAndUpdate(
						id,
						{ $push: { contacts: contact } }, 
						function(error, newData) {
							if(error) {
								console.log(error);
							}
							else {
								console.log("Contact also added");
								response.json(newData);
							}
						});
					}
			});
		},

		// log-in user
		login: function(request, response){
			User.findOne({email: request.body.email, password: request.body.password}, function(error, data){
				if(error){
					console.log('errror');
				}
				else
				{
					if(!data){
						response.json(data);
					}
					else{
						response.json(data);
						console.log('user found');
					}
				}
			});
		},

		// send meassge
		message: function(request, response) {
			
			var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
	        user: 'sender123@gmail.com',
	        pass: 'password'
	    	}
			});

			var mailOptions = {
				from: 'UserName  <sender123@gmail.com>', // sender address
					to: 'recipient123@gmail.com', // list of receivers
		    subject: 'On My Way ', // Subject line
		    text: "Hey "+ request.body.contact + " I'm running late. I'm in " + request.body.location + " . I'll be there in "+ request.body.eta+".", // plaintext body
		    html: "Hey "+ request.body.contact + "I'm running late. I'm in " + request.body.location + " . I'll be there in "+ request.body.eta+"."
			};

			transporter.sendMail(mailOptions, function(error, info) {
		    if(error) {
	        console.log(error);
		    }
		    else {
	        console.log('Message sent: ' + info.response);
	        response.json(info);
		    }
			});
		},

		addContact: function(request, response) {
			console.log('got here');
			var id = request.body.userId;
			var contact = {
				full_name: request.body.name,
				email: request.body.email
			}
			User.findByIdAndUpdate(
				id,
				{ $push: {contacts: contact} }, 
				function(err, data){
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log('successfully added new contact');
					response.json(data);
				}
			});
		},

		destroy: function(request, response) {
			console.log(request.body);
			var current_user_id = request.body.current_user_id;
			var contact_id = request.body._id;
			console.log('contact id:', contact_id);
			console.log('current user id:', current_user_id);

			User.update(
				{_id: current_user_id },

				{ $pull: {'contacts': {'_id': contact_id} } },

				function(err, data){

					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('deleted contact');
						response.json(data);
					}
				});
		}

	};
})();