// import telegram lib
const Telegraf = require('telegraf').Telegraf
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN) // get the token from envirenment variable

/*  messages   */
const welcomeMessage = 'Welcome!🐱🐶 I am an Automatic Feeder Robot. Send me a command so I can feed your pet.'

const helpMessage = 'You can control me by sending these commands:' +
'\n\n' +
'/start - short intro\n' +
'/help - show all the commands available\n' +
'/feed - feed my Kara\n' +
'/info - get information about the last time Kara was fed\n' +
'/settime - set the time to open the feeder\n' +
'/credits - and the 1st prize goes to ...\n'

const creditsMessage = 'UPB-ACS project made by:\n\n' +
'🔵 Ciuciu Anca-Maria\n' +
'🔵 Mihaila Iuliana-Raluca\n' + 
'🔵 Ursu Catalin Emilian\n'

/* /start command   */
bot.start((ctx) => ctx.reply(welcomeMessage)) // display Welcome text when we start bot

/* /help command  */
bot.help((ctx) => ctx.reply(helpMessage))

/* /credits command  */
bot.command('credits', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, creditsMessage, {
    })
})

/* /feed command  */
bot.command('feed', ctx => {
    if (GLOBALSOCKET != undefined){
        sendReply('f');
        ctx.reply("Ok, feeding cat now!");
    }
    else {
        ctx.reply("Bot not connected!");
    }
})

/* /info command  */

/* /settime command  */


// Run the bot
bot.launch() // start


var net = require('net');

GLOBALSOCKET = undefined

function sendReply(data){
  GLOBALSOCKET.write(data);
}

var server = net.createServer(function(socket) {
  socket.write('Echo server!!!\r\n');
    socket.on('error', function(err) {
        console.log("Error")
        GLOBALSOCKET = undefined
     })
    socket.on('close', function(){
        console.log("Socked closed")
        GLOBALSOCKET = undefined
    })
    socket.on('data', function(data) { console.log(data.toString())});
    GLOBALSOCKET = socket;
});

server.listen(1337, '0.0.0.0');
