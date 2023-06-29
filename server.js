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


app.use(express.urlencoded({
  extended: true
}))

// ======================================================================

// *** GET Routes - display pages ***
// Root Route



app.get('/', async function (req, res) {

    var token = await gameAPI.getTwitchAccessToken(client_id, client_secret);
    let hasGame = false;

    if (gameToSearch != null){
        var games = await gameAPI.getGaming(token,client_id,gameToSearch);
        hasGame = true;
        res.render('pages/index',
            {games: games, hasGame}
        );
    } else {
        res.render('pages/index',
            {hasGame}
        );
    }
   
    
});

app.get('/subpage', function (req, res) {
    res.render('pages/subpage');
});

// *** POST Requests - submitting forms ***

var gameToSearch;

app.post('/', function (req, res){
    gameToSearch = req.body.gameToSearch

    res.redirect('/');
});

app.listen(1186);

// ======================================================================