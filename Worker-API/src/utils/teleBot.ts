const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELE_BOT_TOKEN
const chatid = process.env.TELE_CHAT_ID
export class TeleBot{
    public static bot = new TelegramBot(token, {polling: false});
    getBot () {
        return TeleBot.bot;
    }
    constructor(){
        TeleBot.bot.onText(/\/login/, (msg, match) => {
          const user = {username: "", password: ""}
          const chatId = msg.chat.id; 
            
            TeleBot.bot.sendMessage(chatId, "Nhập [username]-[password]");
            TeleBot.bot.on('message', (msg) => {
            console.log(msg.text);
            let account = msg.text.split('-');
            user.username = account[0];
            user.password = account[1];
            console.log(user);
            TeleBot.bot.removeAllListeners('message')
          })
          });
            TeleBot.bot.onText(/\/get_id/, (msg, match) => {
            const chatId = msg.chat.id; 
            TeleBot.bot.sendMessage(chatId, chatId.toString())
            });
        }
}