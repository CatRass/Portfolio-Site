const express = require('express');
const app = express();  
const ejs = require('ejs');

const twitchCreds = require('./tokens/twitchCreds.json');
const gameAPI = require('./modules/gameAPI.js');
const client_id = twitchCreds.client_id;
const client_secret = twitchCreds.client_secret;

const dbConnection = require('./modules/dbConnection.js');

app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.listen(1186);

// ======================================================================

// *** GET Routes - display pages ***
// Root Route

app.get('/', async function (req, res) {

    var token = await gameAPI.getTwitchAccessToken(client_id, client_secret);
    var games = await gameAPI.getGaming(token,client_id,"Tears of the kingdom");

    res.render('pages/index',
    {games: games}
    );
});

app.get('/subpage', function (req, res) {
    res.render('pages/subpage');
});

// ======================================================================