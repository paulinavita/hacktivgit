const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Name is required'],
        minlength : 3,
        maxlength : 30
    },
    email : {
        type : String,
        validate : [{
            validator : function isEmail(email) {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(email)
            }, message : 'Email is not valid'
        }],
        required : [true, 'Email cannot be empty']
    },
    password : {
        type : String,
        required: [true, 'Password is required'],
        minlength : 6,
        maxlength : 16
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User