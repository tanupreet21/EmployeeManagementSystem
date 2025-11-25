const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

//Mongoose pre-save hook that hashes password before saving it to db
userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next;
    //generates a salt for hashing with 1o rounds
    const salt = await bcrypt.genSalt(10);
    //Hashes the password using salt & store it back in document
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);