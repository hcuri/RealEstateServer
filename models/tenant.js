var mongoose = require('mongoose');

var TenantSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String}
});

module.exports = mongoose.model('Tenant', TenantSchema);