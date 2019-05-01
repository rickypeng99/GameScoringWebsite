const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Game Schema for mongodb
 */
Game = mongoose.model("game", new Schema({
    name: {
        type: String,
        required: true
    },
    game_id: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        default: []
    },
    score: {
        type: Object,
        default: {
            "score_1": 0,
            "score_2": 0,
            "score_3": 0,
            "score_4": 0,
            "score_5": 0
        }
    }
}));

module.exports = Game;