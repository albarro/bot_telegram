import {Mensaje} from "./mensaje";
const opciones = require("../../lectores/opciones.js");

interface Activable{
    activar(mensaje: Mensaje): string;
}


class Respuesta implements Activable{
    private respuestaMap: Array<object>;

    constructor(respuesta: Array<object>) {
        this.respuestaMap = respuesta;
    }

    activar(mensaje: Mensaje): string{
        let respuesta : string = "";
        for (const resp of this.respuestaMap) {
            let key = Object.entries(resp)[0][0];
            let value = Object.entries(resp)[0][1];
            switch (key){
                case "texto":
                    respuesta += value;
                    break;
                case "parametro":
                    switch (value) {
                        case "emisor":
                            respuesta += mensaje.getNombreEmisor();
                            break;
                        case "insulto":
                            respuesta += opciones.opcionesInsulto();
                            break;
                        default:
                            throw new Error("No existe el parametro " + value);
                    }
                    break;
                default:
                    throw new Error("No existe la categoria: " + key + " de respuesta");
            }
        }
        return respuesta;
    }
}

class Activador implements  Activable{
    private textoClave: Array<string>;
    private hijos: Array<Activable>;
    private condicion: Function;

    constructor(textoClave: Array<string>, hijos: Array<Activable>, condicion?: string) {
        this.textoClave = textoClave.map(texto => texto.toLowerCase());
        this.hijos = hijos;
        if(condicion){
            this.condicion = new Function("texto", "clave", condicion);
        }
        else{
            this.condicion = (texto, clave) => {return texto.includes(clave)};
        }
    }



    addHijo(hijo: Activable){
        this.hijos.push(hijo);
    }

    activar(mensaje: Mensaje){
        if(this.textoClave.some(r => this.condicion(mensaje.getTextoMinusculas(), r))){
            return this.activarHijos(mensaje);
        }

        return "";
    }

    activarHijos(mensaje: Mensaje) : string{
        for (const hijo of this.hijos) {
            let res = hijo.activar(mensaje);
            if(res){
                return res;
            }
        }

        return "";
    }
}

export {Activable, Activador, Respuesta};
