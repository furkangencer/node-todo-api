const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail, // The function to check the email
            message: '{VALUE} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this; // The individual document
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123');

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => { // It updates the user's token information with the token generated above.
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    }catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth',
    });
};

// The code to run before a given event (In this case, it's save() event)
// We want to hash the user's password before saving it to database.
UserSchema.pre('save', function (next) {
    var user = this;

    if ( user.isModified('password') ){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};