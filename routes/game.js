// get all games in steam
var mongoose = require('mongoose'),
    express = require('express'),
    Game = require('../models/GameSchema.js'),
    router = express.Router();

/**
 * game api endpoint
 * get game info
 */
router.get("/", (req, res) => {
    Game.find({},
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
 * game api endpoint
 * get game info
 */
router.get("/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    Game.findOne(
        { "game_id": game_id },
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
router.put("/comment/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    console.log(typeof game_id)
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    let comment_object = {
        user_name: user_name,
        user_id: user_id,
        comment: comment
    }
    Game.findOneAndUpdate(
        { "game_id": game_id },
        { "$push": { "comment": comment_object } },
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
router.put("/score/:game_id", (req, res) => {
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

/**
 * put game score
 */
router.post("/", (req, res) => {
    console.log(req.body)
    let comment = new Game(req.body); // edited line
    comment.save()
    res.status(201).send(comment)

})

module.exports = router;