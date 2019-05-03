var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    router = express.Router();

/**
 * get all users
 */
router.get("/", (req, res) => {
    User.find({},
        (err, user) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                message: "OK",
                data: user
            });
        });
})


/**
 * PUT user
 */

router.put("/comment/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const date = req.body.date;
    const game_name = req.body.game_name;
    let comment_object = {
        user_name: user_name,
        user_id: user_id,
        comment: comment,
        date: date,
        game_name: game_name,
        game_id: game_id
    }
    User.findOneAndUpdate(
        { "uid": user_id },
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
 * POST user
 */
router.post("/", (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.uid = req.body.uid;
    user.save()
    .then(() => {
        res.status(200).send({data: user, message: "Successfully created a user!"});
    })
    .catch((error) => {
        res.status(500).send({data: "error", message: "Error: creating a new user " + error});

    })
})


/**
 * DELETE user 
 */
router.delete("/:user_id", (req, res) => {
    User.findByIdAndRemove(req.params.user_id)
        .exec()
        .then((user) => {
            if(user != null){
                res.status(200).send({data: user.name, message: "User deleted"})
            } else{
                res.status(404).send({data: "error", message: "Couldn't find user"})
            }
        })
        .catch((error) => {
            res.status(500).send({data: "error", message: "Error: findByIdAndRemove: " + error})

        })
})

/**
 * user api endpoint
 * get user info
 */
router.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    User.findOne(
        { "uid": user_id },
        (err, user) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                message: "OK",
                data: user
            });
        });
})

module.exports = router;