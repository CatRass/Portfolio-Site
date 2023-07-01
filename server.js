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
    res.render('pages/index');
});

// *** POST Request Routes - retrieve data ***

app.post('/getGames', async function (req, res){
    let token = await gameAPI.getTwitchAccessToken(client_id, client_secret);
    let games = await gameAPI.getGaming(token,client_id,req.header('gameName'));
    res.send(JSON.stringify(games));
});

app.post('/addToDB', function (req, res){
    console.log("Adding to DB")
    res.send('{"Test": "Yes", "Test2":"Succ cess"}');
});

// ======================================================================

app.listen(1186);