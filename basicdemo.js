
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
controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) 
{
  bot.reply(message,searchByKeyword("chakde"));
});

// npm i --save youtube-api
function searchByKeyword(query) {
  var results = YouTube.Search.list('id,snippet', {q: query, maxResults: 25});
  var item = results.items[0];
  return item.id.videoId;
}

var distance = require('jaro-winkler'); // npm install jaro-winkler

// We get the top 5 Youtube results, and send in the one with the highest rankQuery score.
function rankQuery (query, songName)
{
	var score = distance(query, name) * 100;
	var temp = songName.toLowerCase();

	if (temp.includes("lyric"))
		score += 5;
	if (temp.includes("remix") != query.includes("remix"))
		score -= 10;
	if (temp.includes("karaoke") != query.includes("karaoke"))
		score -= 12;
	score -= temp.length() / 2;
	return score;
}