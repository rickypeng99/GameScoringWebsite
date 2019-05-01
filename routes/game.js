// get all games in steam
var mongoose = require('mongoose'),
    express = require('express'),
    Game = require('../models/UserSchema.js'),
    router = express.Router();
/**
 * game api endpoint
 * get game info
 */
router.get("/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    Game.findOne(
        { "game_id": mongoose.Types.ObjectId(game_id) },
        (err, game) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                message: "OK",
                data: game
            });
        });
})

/**
 * put game comment
 */
router.put("comment/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    const comment = req.body.comment;
    Game.findOneAndUpdate(
        { "game_id": mongoose.Types.ObjectId(game_id) },
        { "$push": {"comment": comment} },
        { new:true },
        (err, game) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                message: "OK",
                data: game
            });
        });
})

/**
 * put game score
 */
router.put("score/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    const score = req.body.score;
    Game.findOneAndUpdate(
        { "game_id": mongoose.Types.ObjectId(game_id) },
        { "$inc": { "score": {score: 1} } },
        { new: true },
        (err, game) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                message: "OK",
                data: game
            });
        });
})

module.exports = router;