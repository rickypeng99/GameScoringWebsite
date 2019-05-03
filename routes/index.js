
module.exports = function (app) {
    app.use('/api/steam', require('./steam.js'));
    app.use('/api/user', require('./user.js'));
    app.use('/api/game', require('./game.js'));
}