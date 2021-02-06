const token = process.env.TELEGRAM_TOKEN;
const url = process.env.HEROKU_URL;
const env = process.env.NODE_ENV;

// const token = '1432899962:AAH9I_VoTscEZ-md2VWy0MCaZ_vEX00Hu3I';
// const url = 'https://easy4-telegram-bot.herokuapp.com/';
// const env = 'production';
// const env = 'development';

var Bot = require('node-telegram-bot-api');
var bot;

// bot = new Bot(token);

if(env === 'production') {
  bot = new Bot(token);
  bot.setWebHook(url + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, '1');
});

// hello command
bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// sum command
bot.onText(/^\/sum((\s+\d+)+)$/, function (msg, match) {
  var result = 0;
  match[1].trim().split(/\s+/).forEach(function (i) {
    result += (+i || 0);
  })
  bot.sendMessage(msg.chat.id, result).then(function () {
    // reply sent!
  });
});

module.exports = bot;
