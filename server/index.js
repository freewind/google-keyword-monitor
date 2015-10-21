var express = require('express');
var bodyParser = require('body-parser');
var alasql = require('alasql');
var moment = require('moment');
var _ = require('lodash');
var sampleData = require('./sample-data');

var app = express();


// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var keywords = [];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/view/user-keyword', function(req, res) {
  res.send(alasql("select who, keyword from ? \
    group by who, keyword \
    order by who asc, keyword asc", [keywords]));
});

app.get('/view/user-keyword-count', function(req, res) {
  res.send(alasql("select who, keyword, count(keyword) as searchCount from ? \
    group by who, keyword \
    order by who asc, searchCount desc, keyword asc", [keywords]));
});

app.get('/view/user-searchEngine-keyword-count', function(req, res) {
  res.send(alasql("select who, searchEngine, keyword, count(keyword) as searchCount from ? \
    group by who, searchEngine, keyword \
    order by who asc, searchEngine desc, searchCount desc, keyword asc", [keywords]));
});

app.get('/view/user-keyword-by-time', function(req, res) {
  var result = _.map(keywords, function(row) {
    return _.merge(row, {
      timestamp: moment.unix(row.timestamp).format("YYYY-MM-DD hh:mm:ss")
    })
  })
  res.send(keywords);
});

app.post('/keyword', function(req, res) {
  keywords.push({
    who: req.body.who,
    searchEngine : req.body.searchEngine,
    keyword : req.body.keyword,
    timestamp : req.body.timestamp
  })
  res.sendStatus(201);
});

app.put('/clear', function(req, res) {
  keywords = {};
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Google keyword monitor server listening at http://%s:%s', host, port);
});