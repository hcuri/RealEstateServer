var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
    title: {type: String},
    address: {type: String, required: true},
    city: {type: String, required: true},
    value: {type: Number, required: true},
    totalRentPaid: {type: Number, required: true},
    monthsPaid: {type: Number, required: true},
    rentPayment: {type: Number, required: true},
    returnOnInvestment: {type: Number},
    tenant: [TenantSchema],
    image: {type: String},
    dateLastPaid: {type: String}
});

modle.exports = mongoose.model('Property', PropertySchema);