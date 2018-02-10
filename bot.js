var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const util = require('util');
var google = require('googleapis');
var youtube = google.youtube({
	version: 'v3',
	auth: auth.g_token
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.substring(0, 1) == '~') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		args = args.slice(1);
		var args2 = args.join(' ');
        switch(cmd) {
            case 'poke':
			{
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello :eyes:'
                });
			}
            break;
			
			// allows the user to search for whatever youtube video or channel they'd like
			case 'yt':
			{
				const {
					promisify,
				} = require('util');

				const searchAsync = promisify(youtube.search.list);

				async function search(info) {
					const data = searchAsync({
						part: 'snippet',
						maxResults: 1,
						q: info
					});
	
					let ID = data;
					ID.then(function(rawResult){
						if(rawResult.items[0].id.videoId != undefined)
						{
							ret = rawResult.items[0].id.videoId
							bot.sendMessage({
								to: channelID,
								message: 'https://www.youtube.com/watch?v=' + ret
							});
						}
						else if(rawResult.items[0].id.videoId == undefined)
						{
							//console.log('I TICKED')
							ret = rawResult.items[0].snippet.channelId
							bot.sendMessage({
								to: channelID,
								message: 'https://www.youtube.com/channel/' + ret
							});
						}
					})
				}
					search(args2)
			}
			break;
			
			//Playing with timed messages for automated posts
			case 'timeTest':
			{
				function test1()
				{
					bot.sendMessage({
						to: channelID,
						message: 'I COME FROM THE PAST!'
					});
				}
				
				setTimeout(test1, 10000);
			}
			break;
			
			//working on correctly formatting the time for automated posts
			case 'dateFormatTest':
			{
				var date = new Date();
				var hour = date.getHours();
				var min = date.getMinutes();
				bot.sendMessage({
					to: channelID,
					message: '@everyone, its ' + hour + ':' + min 
				});
			}
			break;
			
         }
     }
});