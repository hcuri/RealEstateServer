var mongoose = require('mongoose');
var Property = require('./property');

var UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    properties: [Property.schema],
    firstName: {type: String},
    lastName: {type: String},
    image: {type: String},
    dateCreated: {type: String},
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
});

module.exports = mongoose.model('User', UserSchema);