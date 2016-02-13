var express = require('express');
var twitter = require('./twitter.js')
var app = express();

app.get("/tag/:tag", function(req, res){
  var tag = req.params.tag;

  console.log(tag);

  twitter.getUserTweets(tag, function(err, data){

    res.send(data)


  })

});


app.listen(8000);
