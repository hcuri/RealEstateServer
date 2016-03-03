var mongoose = require('mongoose');
var Lease = require('./lease');
var Expense = require('./expense');

var PropertySchema = new mongoose.Schema({
    title: {type: String},
    address: {type: String, required: true},
    city: {type: String, required: true},
    value: {type: Number, required: true},
    totalRentPaid: {type: Number, required: true},
    monthsPaid: {type: Number, required: true},
    rentPayment: {type: Number, required: true},
    returnOnInvestment: {type: Number},
    image: {type: String},
    dateLastPaid: {type: String},
    expenses: [Expense.schema],
    leases: [Lease.schema]
});

module.exports = mongoose.model('Property', PropertySchema);