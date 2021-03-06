db = require('./models');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Default route for the root of the site
app.get('/', function(req, res) {
  res.render('home');
});

// Add your routes here...
// GET /games - List of all games
app.get('/games', function(req, res) {
  db.game.findAll().then(function(data) {
    res.render('games/index', { games: data });
  });
});

// GET /games/new - Returns a form for adding a new game
app.get('/games/new', function(req, res) {
  res.render('games/new');
});

// POST /games - Adds a new game from the posted form data
app.post('/games', function(req, res) {
  db.game.create({
  name: req.body.name,
  description: req.body.description
}).then(function(data) {
  res.redirect('games');
});
});

// GET /games/:name - Gets one specific game
app.get('/games/:name', function(req, res) {
  db.game.find({
  where: { name: req.params.name }
  }).then(function(data) {
  res.render('games/show', { game: data });
  });
});

// GET /games/:name/edit - Returns a form for editing a game's data
app.get('/games/:name/edit', function(req, res) {
  db.game.find({
    where: { name: req.params.name }
  }).then(function (data) {
    res.render('games/edit', { game: data });
  });
});

// PUT /games/:name - Updates a game from the posted form data
app.put('/games/:name', function(req, res) {
  db.game.update({
    name: req.body.name,
    description: req.body.description
  }, {
    where: { name: req.params.name }
  }).then(function(data){
    res.send('update');
  });
});

// DELETE /games/:name - Delete one specific game
app.delete('/games/:name', function(req, res) {
  db.game.destroy({
  where: { name: req.params.name}
  }).then(function() {
  res.send('deleted');
  });
});
