
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


// give the bot something to listen for.
controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {




  bot.reply(searchByKeyword("chakde"),'Hello yourself.');

});


function searchByKeyword(string query) {
  var results = YouTube.Search.list('id,snippet', {q: query, maxResults: 25});
  var item = results.items[0];
  return item.id.videoId;
}