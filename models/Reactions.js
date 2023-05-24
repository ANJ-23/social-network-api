const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

// Array of `_id` values referencing the `Thought` model
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(), 
    },
    reactionBody: {
        type: String,
        required: [true, "Reaction text required"],
        maxLength: 280,
    },
    username: {
        type: String,
        required: [true, "Username required for reaction"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        /* get: function() {
            return this.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        }, */
    }
});

const Reactions = mongoose.model('Reactions', reactionSchema);

// module.exports = Reactions;
module.exports = reactionSchema;