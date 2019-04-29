var express = require('express');
var app = express();
var request = require('request');

//allow cross domain
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//get all games in steam
app.get('/steam/gameList', (httpRequest, httpResponse) => {
    let url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=BB7C2025C5AF751CEF5650354B24DCC9&format=json'
    request.get(url, (error, steamResponse, steamBody) => {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamBody);
    });
})

//get detailed information of the game with given appid
app.get('/steam/gameInfo/:id', (httpRequest, httpResponse) => {
    let url = 'http://store.steampowered.com/api/appdetails?appids=' + httpRequest.params.id;
    request.get(url, (error, steamResponse, steamBody) => {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamBody);
    });
})

var port = 4000;
app.listen(port)