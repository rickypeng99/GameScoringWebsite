const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * User Schema for mongodb
 */
User = mongoose.model("user", new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}));

module.exports = User;