(function(){
  module.exports = {};

  //Json object of words in use
  var wordFreq = [{word:"null", count: 0}];
  var wordsMap = JSON.parse(require("fs").readFileSync("words.json"));

  var analyze = function(tweetJson, callback, err){

    //fix the 100 dude
    for(var i = 0; i < 10; i++){
      getWords(tweetJson.statuses[i].text);
    }

      callback(err, wordFreq);
  }
  module.exports.analyze = analyze;


  var getWords = function(tweet){
    //this probably works
    words = tweet.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(" ");

    var countupWord = function(x){
      for(var k = 0; k < wordFreq.length; k++){
        if(wordFreq[k].word != words[x] && words[x] != ''){
          wordFreq.push({"word": words[x],"count":1});
          break;
        }
      }
      for(var z = 0; z < wordFreq.length; z++){
        if(words[x] !== ''){
          if(wordFreq[z].word == words[x]){
            wordFreq[z].count += 1;
            break
          }
        }
      }

    }

    for (var y = 0; y< wordsMap.length; y++){
      for(var x = 0; x< words.length; x++){
        if(wordsMap[y].name == words[x]){
          countupWord(x);
          break
        }
      }
    }



    // for(var x = 0; x< words.length; x++){
    //   for(var y=0; y<wordsMap.length; y++){
    //     if(words[x] == wordsMap[y].name){
    //       for(var i=0; i<wordFreq.length; i++){
    //         if(wordFreq[i].word == words[x]){
    //           wordFreq[i].count = wordFreq[i].count + 1;
    //           break;
    //         }else{
    //           wordFreq.push({"word": words[x],"count":1});
    //         }
    //
    //       }
    //
    //
    //
    //     }
    //   }
    // }

    // for(var x = 0; x < wordsMap.length; x ++){
    //   for(var i = 0; i < words.length; i++){
    //
    //     for(var y = 0; y < wordFreq.length; y++){
    //
    //       if(wordsMap[x].name == words[i]){
    //         if(wordsMap[x].name == wordFreq[y].word){
    //           //updateJson(word);
    //         }else{
    //             }
    //       }
    //     }
    //   }
    // }


        // if (wordsMap[words[i]]){
        //   if(wordFreq[words[i]]){
        //     updateJson(word);
        //   }else{
        //     wordFreq.push({word:word})
        //     wordFreq.push({"word":"'+word+'","count":"'+1'"};);
        //   }
        // }






  }

  function updateJson(word){

    for (var i=0; i<wordFreq.length; i++) {
      if (wordFreq[i].word == word) {
        wordFreq[i].count = wordFreq[i].count + 1;
      break;
      }
    }

  }


})();
