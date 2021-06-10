"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mensaje_1 = require("../mero/opereraciones/mensaje");
var respuestas_1 = require("../mero/opereraciones/respuestas");
var assert = require("assert");
var mensajeBot = new mensaje_1.Mensaje({ from: { first_name: "testo" }, text: "Bot" });
var mensaje_bot = new mensaje_1.Mensaje({ from: { first_name: "testo" }, text: "bot" });
var mensajeFunciones = new mensaje_1.Mensaje({ text: "bot funciones" });
var mensajeCualquiera = new mensaje_1.Mensaje({ text: "asdfe sdfree" });
var activacionBotFuncion = new respuestas_1.Activador(["funciones"], [new respuestas_1.Respuesta([{ texto: "funciones" }])]);
var activacionBot = new respuestas_1.Activador(["Bot"], [activacionBotFuncion, new respuestas_1.Respuesta([{ texto: "hola " }, { parametro: "emisor" }])]);
//TEST Activaciones
function testCreacionActividades() {
    assert.deepStrictEqual(activacionBot.activar(mensajeBot), "hola testo");
    assert.deepStrictEqual(activacionBot.activar(mensaje_bot), "hola testo");
    assert.deepStrictEqual(activacionBot.activar(mensajeFunciones), "funciones");
    assert.deepStrictEqual(activacionBot.activar(mensajeCualquiera), "");
}
;
testCreacionActividades();
//# sourceMappingURL=test.js.map