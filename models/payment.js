var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    date: {type: String, required: true}
});

module.exports = mongoose.model('Payment', PaymentSchema);