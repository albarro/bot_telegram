let opcionesViernes = ["Viernes"];
let opcionesSabado = ["Sábado"];
let opcionesDomingo = ["Domingo"];
let opcionesInsulto = ["Tu puta mitad"];

const utilidades = require("./util.js")
const opcionesDiasJSON = require('../recursos/opcionesDias.json');
const opcionesInsultoJSON = require('../recursos/opcionesInsulto.json');

let cargado = false;

function cargar(){
    opcionesViernes = opcionesViernes.concat(opcionesDiasJSON.Viernes);
    opcionesSabado = opcionesSabado.concat(opcionesDiasJSON.Sabado);
    opcionesDomingo = opcionesDomingo.concat(opcionesDiasJSON.Domingo);

    opcionesInsulto = opcionesInsulto.concat(opcionesInsultoJSON.Insulto);

    cargado = true;
}

function getOpcionesDias(){
    let dias = [];

    if(!cargado){
        cargar();
    }

    dias.push(opcionesViernes[utilidades.getRandomEntero(0, opcionesViernes.length)]);
    dias.push(opcionesSabado[utilidades.getRandomEntero(0, opcionesSabado.length)]);
    dias.push(opcionesDomingo[utilidades.getRandomEntero(0, opcionesDomingo.length)]);

    return dias;
}

function getOpcionesHoras(){
    let horas = [];

    for (let i = 10; i < 20; i++) {
        horas.push( i + ":00");
    }
     return horas;
}

function getOpcionesInsulto(){

    if(!cargado){
        cargar();
    }

    return opcionesInsulto[utilidades.getRandomEntero(0, opcionesInsulto.length)];
}

const opciones  = {
    opcionesDias: getOpcionesDias,
    opcionesHoras: getOpcionesHoras,
    opcionesInsulto: getOpcionesInsulto
}
module.exports = opciones;


