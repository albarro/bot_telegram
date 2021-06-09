import {Mensaje} from "../mero/opereraciones/mensaje";
import {Activador, Respuesta} from "../mero/opereraciones/respuestas";
import * as assert from "assert";

let mensajeBot = new Mensaje({from: {first_name: "testo"}, text: "Bot"});
let mensaje_bot = new Mensaje({from: {first_name: "testo"}, text: "bot"});
let mensajeFunciones = new Mensaje( {text: "bot funciones"});
let mensajeCualquiera = new Mensaje({text: "asdfe sdfree"});

let activacionBotFuncion = new Activador(["funciones"],[new Respuesta([{texto: "funciones"}])]);
let activacionBot = new Activador(["Bot"],[activacionBotFuncion, new Respuesta([{texto: "hola "},{parametro: "emisor"}])]);



//TEST Activaciones
function testCreacionActividades() {

    assert.deepStrictEqual(activacionBot.activar(mensajeBot), "hola testo");
    assert.deepStrictEqual(activacionBot.activar(mensaje_bot), "hola testo");
    assert.deepStrictEqual(activacionBot.activar(mensajeFunciones), "funciones");
    assert.deepStrictEqual(activacionBot.activar(mensajeCualquiera), "");

};

testCreacionActividades();
