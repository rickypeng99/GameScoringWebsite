// get all games in steam
var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    request = require('request');

router.get('/gameList', (httpRequest, httpResponse) => {
    let url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=BB7C2025C5AF751CEF5650354B24DCC9&format=json'
    request.get(url, (error, steamResponse, steamBody) => {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamBody);
    });
})

//get detailed information of the game with given appid
router.get('/gameInfo/:id', (httpRequest, httpResponse) => {
    let url = 'http://store.steampowered.com/api/appdetails?appids=' + httpRequest.params.id;
    request.get(url, (error, steamResponse, steamBody) => {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamBody);
    });
})

module.exports = router;