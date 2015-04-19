var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost/OMW_App');

// path to files in models folder
var models_path = path.join(__dirname, './../server/models');

// loop through and require all models in models folder
fs.readdirSync(models_path).forEach(function (file){
	if (file.indexOf('.js') > 0)
	{
		require(path.join(models_path,'/',file));
	}
});