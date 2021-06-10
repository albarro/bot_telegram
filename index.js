const Mero = require('./app/mero/mero').Mero;
const TelegramBot = require('node-telegram-bot-api');
const token = require('./ficheros/token.json').Token;

const bot = new TelegramBot(token, {polling: true});
let mero = new Mero(bot);


bot.on('message', (msg) => {
        mero.probarMensaje(msg);
});


bot.on("polling_error", (msg) =>{
    mero.enviarAviso(msg,"Que panda el cunico algo a salido maaaal \n Error:" + msg );
    console.error("-Error:" + msg);
});
