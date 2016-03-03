var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({

    amount: {type: Number, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true}
});

module.exports = mongoose.model('Expense', ExpenseSchema);