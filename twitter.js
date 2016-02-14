var fs = require("fs");
var Twit = require("twit");
(function(){
  var auth = JSON.parse(fs.readFileSync("auth.json"));
  var bot = new Twit(auth);

  module.exports = {};

  /** @param screen_name Twitter handle of user's tweets
   *  @param callback the function to call when the tweets have been returned
   *                  This should have parameters err, data.
   *                  API error can be handled with if(err) {...}
   *                  data is the array of tweets
   *   @return tweets Array of tweet objects
   */
  var getUserTweets = function(screen_name, callback){
    var params = {
      screen_name: screen_name,
      count: 200,
      include_rts: true,
      exclude_replies: true
    };
    bot.get("statuses/user_timeline", params, function(err, data, response){
      console.log("ERR: " + err);
      if(data.length === 0){
        err = "User not found";
      }
      callback(err, data);
    });
  };
  module.exports.getUserTweets = getUserTweets;

  var getTagTweets = function(tag, callback){
    bot.get('search/tweets', { q: tag, count: 200 }, function(err, data, response) {
      callback(err, data);
});

  };
  module.exports.getTagTweets = getTagTweets;

}



)();
