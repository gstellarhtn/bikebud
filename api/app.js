var express = require('express');
var async = require("async");
var pg = require('pg'); // Require the driver.
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:26257?sslmode=disable';
var client = new pg.Client(connectionString);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

/*  Add user */
app.post('/addUser', function(req, res) {

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
      client.query("INSERT INTO bikebud.accounts (username, password) VALUES($1, $2);", [data.username, data.password], function(err, result) {
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

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});