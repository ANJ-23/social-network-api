const mongoose = require('mongoose');
const dayjs = require('dayjs')
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;
const Reactions = require('./Reactions');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: [true, "Thought text required"],
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: String,
        default: Date.now,
        /* get: function() {
            const date = new Date();
            return dayjs(date).format('MM-DD-YYYY');
        }, */
    },
    username: {  // (?)references 'User'
        type: String,
        required: [true, "Username required for thought"],
    },
    reactions: [Reactions]
},
{
    toJSON: { // turns external keys into JSON data points
        virtuals: true,
    },
    id: false,
});

// virtual that returns the number (length) of 'reactions'
thoughtsSchema.virtual('reactionCount').get(function() {
    return `Number of reactions: ${this.reactions.length}`;
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
