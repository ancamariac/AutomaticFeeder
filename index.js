// import telegram lib
const Telegraf = require('telegraf').Telegraf 
const BOT_TOKEN = '1838199642:AAFbYfFlTnZx5cf-4wVx6f9ACGjXB0qldeo';

const bot = new Telegraf(BOT_TOKEN) // get the token from envirenment variable

// Start command
bot.start((ctx) => ctx.reply('Hi! I am here to help you feed your cat!')) // display Welcome text when we start bot
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // listen and handle when user type hi text

// Help command
bot.command((ctx) => {
    ctx.reply("How can I help you?")
})

// Run the bot
bot.launch() // start