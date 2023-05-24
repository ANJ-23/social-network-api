const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: [true, "Username is already registered."],
        trim: true, // removes any spaces before & after the string
    },
    email: { 
        type: String, 
        required: [true, "Email required"],
        unique: [true, "Email is already registered."],
        validate: { // checks if email is in email format; else, return error message
            validator: function(input) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(input);
            },
            message: "Not a valid email",
        },
    },
    thoughts: {
        type: [mongoose.Schema.Types.ObjectId], // takes the '_id' from another model's data
        ref: "Thoughts"
    },
    friends: { // SELF-REFERENCES USER
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
},
{
    toJSON: { // turns external keys into JSON data points
        virtuals: true,
    },
    id: false,
});

// virtual that returns the number (length) of 'friends'
userSchema.virtual('friendCount').get(function() {
    return `Number of friends: ${this.friends.length}`;
});

// creates a model out of 'userSchema'
const User = mongoose.model('User', userSchema);

module.exports = User;
