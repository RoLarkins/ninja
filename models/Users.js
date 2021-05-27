const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "minimum length is 6 characters"]
    },
});

userSchema.post('save', function (doc, next){
    console.log('new user was creatted and saved', doc)
    next();
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;

