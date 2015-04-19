require('./config/mongoose.js');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// static content
app.use(express.static(path.join(__dirname, './client')));

// set-up body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// require routes.js
var routes = require('./config/routes.js')(app);

// set port
var server = app.listen(8000, function() {
	console.log("Listening on port 8000");
});