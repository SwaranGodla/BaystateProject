const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//method for user schema in  database
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'email can\'t be empty'
    },
    password: {
        type: String,
        required: 'password can\'t be empty'
    },
    name: {
        type: String,
        required: 'User name can\'t be empty'
    },
    city: {
        type: String,
        required: 'Mobile can\'t be empty'
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Method for verify email
userSchema.methods.verifyEmail = function(email) {
    return bcrypt.compareSync(email, this.email);
};

// method for verify password
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// method for generating token for valid user
userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);