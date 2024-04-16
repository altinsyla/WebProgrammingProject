const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// Kur tklikohet butoni save, .pre osht para se me u ekzekutu e kontrollon nese so pasi i modifikun await bcrypt.hash e modifikon
UserSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12)
    next();
}) 

module.exports = mongoose.model('User', UserSchema);