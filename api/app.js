var express = require('express');
var async = require("async");
var pg = require('pg'); // Require the driver.
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

//var server = http.createServer(app);

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var connectionString = process.env.DATABASE_URL || 'postgresql://root@173.255.116.51:26257?sslmode=disable';

var client = new pg.Client(connectionString);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

/*  Add user */
app.post('/register', function(req, res) {

  console.log(req.body);
  console.log(req.params);

  try {
    // Grab data from http request
    var data = {username: req.body.username, password: req.body.password};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      // Insert customer
      client.query("INSERT INTO bikebud.users (username, password) VALUES($1, $2);", [data.username, data.password], function(err, result) {
        done();
        res.send();

        if (err) {
          return console.error('error happened during query', err)
        }
      });
    });
  } catch (ex) {
    callback(ex);
  }
});

/* User login */
app.post('/login', function(req, res) {

  console.log(req.body);
  console.log(req.params);

  try {
    // Grab data from http request
    var data = {username: req.body.username, password: req.body.password};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      // Insert customer
      var query = client.query("SELECT * FROM bikebud.users WHERE username = $1);", [data.username], function(err, result) {
        done();
        res.send();



        if (err) {
          return console.error('error happened during query', err)
        }
      });
    });
  } catch (ex) {
    callback(ex);
  }
});

app.listen(80, function() {
  console.log('Listening on port 80!');
});

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!');
// });