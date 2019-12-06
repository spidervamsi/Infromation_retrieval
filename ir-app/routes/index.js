var express = require('express');
const request = require('request');
const appHttp = require('http');

const server = 'http://localhost:8983';
const core = 'tweets2';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getTweets', (req, res) => {

  req.on('data', function (body) {
    
    result = JSON.parse(body);
    console.log("test " + result.query);

    var full_query = server+'/solr/'+core+'/select?q=tweet_text%3A%20' + encodeURIComponent(result.query) + '&defType=edismax&qf=tweet_text&wt=json&indent=true&rows=20&start=0';
    
    results = checkData(full_query, function (data) {
      res.send(data);
    });
    
  });

});

function checkData(full_query, callback) {
  console.log("full_query " + full_query);

  request(full_query, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    // res.send(body);
    callback(body)
  });

}

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/analytics', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
