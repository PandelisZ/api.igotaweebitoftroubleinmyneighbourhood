var express = require('express');
var twitter = require('./twitter.js')
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.get("/tag/:tag", function(req, res){
  var tag = req.params.tag;

  console.log(tag);

  twitter.getUserTweets(tag, function(err, data){

    res.send(data)


  })

});


app.listen(port, ipaddress, function(){
  console.log("Running on port " + port);
});
