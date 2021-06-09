import {Activable, Activador, Respuesta} from '../mero/opereraciones/respuestas';

const path = require('path');
const fs = require('fs');

/**
 * Carga las activaciones de manera asíncrona
 *
 * @param callback
 */
function iniciar(callback: (activaciones:Array<Activable>) => any) {
    let activaciones;
    const activacionesJSON = path.resolve(__dirname, '../../ficheros/activaciones.json');
    fs.readFile(activacionesJSON, (err, data) => {
        if (err) throw err;
        activaciones = JSON.parse(data);
        callback(cargar(activaciones.activaciones));
    });


}

function cargar(activaciones) : Array<Activable>{
    let acts = new Array<Activable>();
    for (const activador of activaciones) {//Por cada activador en las activaciones
        acts.push(crearActivacion(activador));
    }

    return acts;
}

function crearActivacion(activador): Activador{
    let clave = activador.activador;
    let hijosJSON = activador.hijos;
    let condicionJSON = activador.condicion;
    let respuesta = activador.respuesta;

    let hijos = new Array();
    if(hijosJSON)
        for (const hijo of hijosJSON) {
            hijos.push(crearActivacion(hijo));
        }

    respuesta = crearRespuesta(respuesta);
    hijos.push(respuesta);


    return new Activador(clave, hijos, condicionJSON);

}

function crearRespuesta(respuesta): Respuesta{

    let respuestaArray = new Array();
    for (const trozo of respuesta) {
        respuestaArray.push(trozo);
    }

    return new Respuesta(respuestaArray);
}

export {iniciar as cargarActivaciones};

