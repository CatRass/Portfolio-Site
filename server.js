var express = require('express');
const browserify = require('browserify');
const fs = require('fs');
var app = express();   

const ejs = require('ejs');

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