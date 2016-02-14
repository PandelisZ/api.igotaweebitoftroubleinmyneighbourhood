var express = require('express');
var twitter = require('./twitter.js');
var analyze = require('./analyze.js');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.get("/tag/:tag", function(req, res){
  var tag = req.params.tag;

  console.log(tag);

  twitter.getTagTweets(tag, function(err, data){

    res.send(data);


  })

});
app.get("/analyze/:tag", function(req, res){
var wordFreq = [{word:"null", count: 0}];
  var tweetJson = [];
  var tag = req.params.tag;
  // var request = require('request');
  //   request('http://api.igotaweebitoftroubleinmyneighbourhood.com/tag/%23stirhack', function (error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //           tweetJson = JSON.parse(body);
  //        }
  //   })

  twitter.getTagTweets(tag, function(err, data){
    analyze.analyze(data, function(err, wordFreq){
      res.send(wordFreq);
      wordFreq = 0;
    })
  })



});


app.listen(port, ipaddress, function(){
  console.log("Running on port " + port);
});
