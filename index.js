// import telegram lib
const Telegraf = require('telegraf').Telegraf 
const BOT_TOKEN = '1838199642:AAFbYfFlTnZx5cf-4wVx6f9ACGjXB0qldeo';
const bot = new Telegraf(BOT_TOKEN) // get the token from envirenment variable

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

/* /info command  */

/* /settime command  */


// Run the bot
bot.launch() // start