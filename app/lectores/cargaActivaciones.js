"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarActivaciones = void 0;
var respuestas_1 = require("../mero/opereraciones/respuestas");
var path = require('path');
var fs = require('fs');
/**
 * Carga las activaciones de manera asíncrona
 *
 * @param callback
 */
function iniciar(callback) {
    var activaciones;
    var activacionesJSON = path.resolve(__dirname, '../../ficheros/activaciones.json');
    fs.readFile(activacionesJSON, function (err, data) {
        if (err)
            throw err;
        activaciones = JSON.parse(data);
        callback(cargar(activaciones.activaciones));
    });
}
exports.cargarActivaciones = iniciar;
function cargar(activaciones) {
    var acts = new Array();
    for (var _i = 0, activaciones_1 = activaciones; _i < activaciones_1.length; _i++) { //Por cada activador en las activaciones
        var activador = activaciones_1[_i];
        acts.push(crearActivacion(activador));
    }
    return acts;
}
function crearActivacion(activador) {
    var clave = activador.activador;
    var hijosJSON = activador.hijos;
    var condicionJSON = activador.condicion;
    var respuesta = activador.respuesta;
    var hijos = new Array();
    if (hijosJSON)
        for (var _i = 0, hijosJSON_1 = hijosJSON; _i < hijosJSON_1.length; _i++) {
            var hijo = hijosJSON_1[_i];
            hijos.push(crearActivacion(hijo));
        }
    respuesta = crearRespuesta(respuesta);
    hijos.push(respuesta);
    return new respuestas_1.Activador(clave, hijos, condicionJSON);
}
function crearRespuesta(respuesta) {
    var respuestaArray = new Array();
    for (var _i = 0, respuesta_1 = respuesta; _i < respuesta_1.length; _i++) {
        var trozo = respuesta_1[_i];
        respuestaArray.push(trozo);
    }
    return new respuestas_1.Respuesta(respuestaArray);
}
//# sourceMappingURL=cargaActivaciones.js.map