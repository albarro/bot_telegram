let opcionesViernes = ["Viernes"];
let opcionesSabado = ["Sábado"];
let opcionesDomingo = ["Domingo"];
let opcionesNopoder = ["No puedo"];
let opcionesInsulto = ["Tu puta mitad"];

const utilidades = require("../utilidades/util.js")
const opcionesDiasJSON = require('../../ficheros/opcionesDias.json');
const opcionesInsultoJSON = require('../../ficheros/opcionesInsulto.json');

const nombreBot = 'Mero_la_mitad_bot';

let cargado = false;

function cargar(){
    opcionesViernes = opcionesViernes.concat(opcionesDiasJSON.Viernes);
    opcionesSabado = opcionesSabado.concat(opcionesDiasJSON.Sabado);
    opcionesDomingo = opcionesDomingo.concat(opcionesDiasJSON.Domingo);
    opcionesNopoder = opcionesNopoder.concat(opcionesDiasJSON.NoPoder);

    opcionesInsulto = opcionesInsulto.concat(opcionesInsultoJSON.Insulto);

    cargado = true;
}

/**
 * Obtiene las posibilidades de dias cargados de la lista
 *
 * @returns {[]} array con tres dias en string
 */
function getOpcionesDias(){
    let dias = [];

    if(!cargado){
        cargar();
    }

    dias.push(opcionesViernes[utilidades.getRandomEntero(0, opcionesViernes.length)]);
    dias.push(opcionesSabado[utilidades.getRandomEntero(0, opcionesSabado.length)]);
    dias.push(opcionesDomingo[utilidades.getRandomEntero(0, opcionesDomingo.length)]);
    dias.push(opcionesNopoder[utilidades.getRandomEntero(0, opcionesNopoder.length)]);

    return dias;
}

/**
 * Obtiene un array con las horas desde las 10:00 hasta las 20:00
 *
 * @returns {[]} array con las horas en string
 */
function getOpcionesHoras(){
    let horas = [];

    for (let i = 10; i < 20; i++) {
        horas.push( i + ":00");
    }
     return horas;
}

/**
 * Obten un insulto aleatorio de la lista de insultos.
 *
 * @returns string, el insulto.
 */
function getOpcionesInsulto(){

    if(!cargado){
        cargar();
    }

    return opcionesInsulto[utilidades.getRandomEntero(0, opcionesInsulto.length)];
}

const opciones  = {
    opcionesDias: getOpcionesDias,
    opcionesHoras: getOpcionesHoras,
    opcionesInsulto: getOpcionesInsulto,
    nombreBot: nombreBot
}
module.exports = opciones;


