const express = require('express');
const app = express();  
const ejs = require('ejs');
const twitchCreds = require('./tokens/twitchCreds.json');

const fetch = require('node-fetch');
const fs = require('fs');

app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.listen(1186);

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});
app.get('/subpage', function (req, res) {
    res.render('pages/subpage');
});

// ======================================================================

const client_id = twitchCreds.client_id;
const client_secret = twitchCreds.client_secret;

async function getTwitchAccessToken(client_id, client_secret){

    const response = await fetch('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type=client_credentials', {
        method: 'post',
    });

    const data = await response.json();
    console.log(data['access_token']);
    return data['access_token'];
    
}



async function getGaming(twitchAuth, client_id){

    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Client-ID': client_id,
            'Authorization': "Bearer " + await twitchAuth
        },
        body: 'fields name, involved_companies; search "Tears of the kingdom";'
    });
    const data = await response.json();
    console.log(data);
}

var token = getTwitchAccessToken(client_id, client_secret);
var games = getGaming(token,client_id);