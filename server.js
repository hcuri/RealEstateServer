var express     = require('express');
var https       = require('https');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var fs          = require('fs');
var config      = require('./config');
var port = process.env.PORT || 8080; // set our port


// Setup the app so other modules can also access it through exports
var app = module.exports = express();

// Set the secret variable for using JWT
app.set('jwtSecret', config.secret);

// connect to database
mongoose.connect(config.database);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable logging
app.use(require('./logging'));

// connect the login routes
var loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

// connect the authorized routers
var userRoutes = require('./routes/userRoutes');
var propertyRoutes = require('./routes/propertyRoutes');
app.use('/api', userRoutes);
app.use('/api', propertyRoutes);

// handle error
app.use(require('./errorHandler'));

// Start the server
app.listen(port);
console.log('MyRealEstate API Server listening on port: ' + port);