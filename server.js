// const http = require('http');
// const express = require("express");
// const ejs = require('ejs');

// const hostname = '127.0.0.1';
// const port = 3000;
// const app = express()

// app.listen(3000, () => { 
//     console.log("Server running on port 3000");
// });

// app.get("/", (req,res) => { 
//     // app.get to handle GET requests
//     // req - http request, res - desired response
//     res.send("Hello World"); // send Hello World to this route
// });

var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(3000);

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});