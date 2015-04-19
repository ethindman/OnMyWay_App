var mongoose = require('mongoose');

// declares schema
var UserSchema = new mongoose.Schema({
	full_name: { type: String, trim: true },
	email: { type: String, trim: true },
	password: { type: String, trim: true },
	address: { type: String, trim: true },
	contacts: [{
		full_name: { type: String, trim: true },
		email: { type: String, trim: true },
		phone_number: { type: Number, trim: true },
	}],
	messages: [],
});

// creates collection 'friends' (plural) using friendSchema
mongoose.model('User', UserSchema);

// create form validations
// UserSchema.path('full_name').required(true, 'Name cannot be blank');
// UserSchema.path('password').required(true, 'Password cannot be blank');
// UserSchema.path('email').required(true, 'Email cannot be blank');
// UserSchema.path('address').required(true, 'Address cannot be blank');