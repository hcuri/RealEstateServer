var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    properties: [PropertySchema],
    firstName: {type: String},
    lastName: {type: String},
    image: {type: String},
    dateCreated: {type: String}
});

modle.exports = mongoose.model('User', UserSchema);