const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    source: {
        type: String,
        required:true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    registeredDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Income', IncomeSchema);