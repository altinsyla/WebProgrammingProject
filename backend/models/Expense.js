const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: String,
    amount: Number,
    date: {type: Date, default: Date.now},
    description: String,
    paid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Expense', ExpenseSchema);