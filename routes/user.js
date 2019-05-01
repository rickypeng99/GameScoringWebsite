var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    router = express.Router();

/**
 * user api endpoint
 * get user info
 */
router.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    User.findOne(
        { "_id": mongoose.Types.ObjectId(user_id) },
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