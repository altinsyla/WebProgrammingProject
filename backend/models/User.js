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
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password)
    next();
}) 

UserSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);