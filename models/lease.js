var mongoose = require('mongoose');
var Payment = require('./payment');
var Tenant = require('./tenant');

var LeaseSchema = new mongoose.Schema({

    numberOfTerms: {type: Number, required: true},
    termPeriod: {type: String, required: true},
    rentAmount: {type: Number, required: true},
    rentDueDate: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate:  {type: String, required: true},
    payments: [Payment.schema],
    tenants: [Tenant.schema]
});

module.exports = mongoose.model('Lease', LeaseSchema);