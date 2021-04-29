//Libreria
const TelegramBot = require('node-telegram-bot-api');
const opciones = require('./utilidades/opciones.js');
const comprobadorSpam = require('./utilidades/anti-spam');
const cambioMonedas = require('./utilidades/cambioMondedas');

//Token del bot
const token = '1702690589:AAFpot2wyaFW3NzzUFn-btgI7FQiOmr62ks';

//Bot
const bot = new TelegramBot(token, {polling: true});

let mero = "mero", funciones = "funciones";
let psoe = ["psoe","izquierda", "comunistas","socialismo","elecciones","ayuso","podemos","unidas","mas madrid", "ayuso","pp", "ciudadanos"];
let funcionesTexto = "Hola mis funciones actuales son: \n" +
    "/encuesta sirve para crear la vieja y confiable encuesta del dia de rol, puedes añadirle hora, para que pregunte por las horas," +
    " o anónima y única para modificar las posibilidades de respuesta \n" +
    "/convertir convierte monedas, ej: /convertir 420 po pc (Convertiría 420 monedas de oro a cobre)";

bot.on('message', (msg) => {
    let test;
    if(msg.text  && !msg.text.includes('/')) {//Comprobamos que es texto y que no es un comando

        if (msg.text.toLowerCase().includes(mero)) //Si incluye mero
            if(test || comprobarSpam(msg)) {
                test = true;
                if (msg.text.toLowerCase().indexOf(mero) === 0) { //Si mero es lo primero que se dice
                    enviarMensaje(msg, "Hola " + msg.from.first_name + " que desa hoy su berenjenidad.");
                } else if (msg.text.toLowerCase().includes(funciones)) {//Respondemos a mero funciones
                    enviarMensaje(msg, funcionesTexto);
                } else { //Mero sin nada mas = insulto
                    enviarMensaje(msg, opciones.opcionesInsulto()).then(payload => {
                        bot.onReplyToMessage(payload.chat.id, payload.message_id, (msg) => {
                            enviarMensaje(msg, opciones.opcionesInsulto())
                        })
                    });
                }
            }


        if (psoe.some(r => msg.text.toLowerCase().includes(r))) { //Comprobamos que es texto, que contiene psoe
            if (test || comprobarSpam(msg)) {
                enviarMensaje(msg, "LLevo votando a a la izquierda desde que tengo 18 años pero tras ver el debate" +
                    " de Madrid votare a VOX. Rocío Monasterio a sido la única que le ha echado cojones a dejarle las cosas" +
                    " claras a Pablo Iglesias");
            }
        }
    }
});


bot.onText(/\/encuesta/, (msg) => {
    if(comprobarSpam(msg)) {// Comprobamos posible spam
        let anonima = 'false';
        if (msg.text.toLowerCase().includes("anónima")) {
            anonima = 'true';
        }
        let respMultiple = 'true';
        if (msg.text.toLowerCase().includes("única")) {
            respMultiple = 'false';
        }

        const hora = "hora";
        if (msg.text.toLowerCase().includes(hora)) {
            enviarEncuesta(msg, "Horacion", opciones.opcionesHoras(), anonima, respMultiple);
        } else {
            enviarEncuesta(msg, "Roleacion", opciones.opcionesDias(), anonima, respMultiple);
        }
    }
});

function enviarMensaje(msg, texto, form){
    return bot.sendMessage(msg.chat.id, texto, form);
}

function enviarEncuesta(msg, pregunta, opciones, anonima, respMultiple){
    bot.sendPoll(msg.chat.id, pregunta, opciones, {
        "is_anonymous":anonima,
        "allows_multiple_answers":respMultiple
    });
}

function comprobarSpam(mensaje){
    let respuesta = comprobadorSpam.probarUsuario(mensaje.from.first_name);
    if(!respuesta[0]) {// Comprobamos que no sea spam, en el primer indice va el bool
        if(respuesta[1] < 2) { //Numero de intentos
            enviarMensaje(mensaje,"Tranquilito " + mensaje.from.first_name + " esperate " + respuesta[2] + " segundos.");
        }else if(respuesta[1] > 1 && respuesta[1] < 3){
            enviarMensaje(mensaje,"Se acabo tonto que eres tonto ya no te respondo por " + respuesta[2] + " segundos.");
        }
        console.log("Usuario:" + mensaje.from.first_name + " Spamea:" + respuesta[1]);
        return false;
    }else
        return true;
}

bot.onText(/\/convertir/, (msg) => {
    if(comprobarSpam(msg)) {// Comprobamos posible spam
        let texto = msg.text.toLowerCase().split(" ");

        if(texto.length < 2){
            enviarMensaje(msg, "Vamos a convertir dineros\n" +
                "Pasamelo de la forma: cantidad monedaOriginal monedaDestino\n" +
                "Ej: 123 pc po | 2 pp po | 1 po pc",{"reply_markup":{"force_reply":true}}
                ).then( payload => {
                    bot.onReplyToMessage(payload.chat.id, payload.message_id, (msg) =>{
                        let texto = msg.text.toLowerCase().split(" ");

                        let cantidad = texto[0];
                        let monedaOrg = texto[1];
                        let monedaObj = texto[2];

                        convertir(cantidad,monedaOrg,monedaObj, msg);
                    })
            })
        }else {

            let cantidad = texto[1];
            let monedaOrg = texto[2];
            let monedaObj = texto[3];

            console.log(texto);

            convertir(cantidad, monedaOrg, monedaObj, msg);
        }
    }
});

function convertir(cantidad, monedaOrg, monedaObj, msg){
    if(isNaN(cantidad)) {//Comprobamos el numero
        enviarMensaje(msg, "Comprueba que " + cantidad + " es un numero correcto");
        return;
    } if(!cambioMonedas.comprobarMoneda(monedaOrg)){
        enviarMensaje(msg, "Comprueba que la primera moneda(" + monedaOrg + ") es una de estas " + cambioMonedas.getMonedas());
        return;
    } if(!cambioMonedas.comprobarMoneda(monedaObj)) {
        enviarMensaje(msg, "Comprueba que la moneda objetivo(" + monedaObj + ") es una de estas " + cambioMonedas.getMonedas());
        return;
    }

    let nuevaCantidad = cambioMonedas.convertir(cantidad, monedaOrg, monedaObj);
    enviarMensaje(msg, "Eso son " + nuevaCantidad + " " + monedaObj);
}

bot.on("polling_error", (msg) => console.log(msg));


