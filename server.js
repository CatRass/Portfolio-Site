const express = require('express');
const app = express();  

const ejs = require('ejs');

const twitchCreds = require('./tokens/twitchCreds.json');
const gameAPI = require('./modules/gameAPI.js');
const client_id = twitchCreds.client_id;
const client_secret = twitchCreds.client_secret;

const dbConnection = require('./modules/dbConnection.js');
let db=dbConnection.db;
const fs = require('fs')
const fetch = require('node-fetch')

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

app.post('/addReview' , function(req,res){
    // db.run('INSERT INTO consoles(consolename,iconpath) VALUES("YEs","No")');
    let name=           req.header('Game-Name');
    let developer=      req.header('Game-Developer');
    let publisher=      req.header('Game-Publisher');
    let releaseDate=    req.header('Game-ReleaseDate');
    let platforms=      req.header('Game-Platforms');
    let posterURL=      req.header('Game-Poster');
    let posterID=      req.header('Game-PosterID');

    let review=         req.header('Review-Content');
    let stars=          req.header('Review-Stars');

    let platformsArray = platforms.split(',');

    fetch(posterURL)
	.then(res =>
		res.body.pipe(fs.createWriteStream('./public/images/posters/'+posterID+'.jpg'))
	)

    for (let i=0; i<platformsArray.length; i++){
        db.run('INSERT INTO game(gamename,releasedate,console,developer,posterpath) VALUES("'+name+'","'+releaseDate+'","'+platformsArray[i]+'","'+developer+'","'+posterID+'.jpg")');
    }
    db.run('INSERT INTO review(gamename,rating,summary) VALUES("'+name+'","'+stars+'","'+review+'")');

    res.send('{"Test": "Yes", "Test2":"Succ cess"}');
});

// ======================================================================

app.listen(1186);