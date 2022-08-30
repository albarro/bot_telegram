import {Mero} from "../mero";
import {Mensaje} from "./mensaje";

const path = require('path');

const opciones = require("../../lectores/opciones");
const cambioMonedas = require("../../utilidades/cambioMondedas");
const util = require("../../utilidades/util");


export interface Comando {
    activar(msg: Mensaje);
}


class ComandoBase implements Comando{
    mero: Mero;
    private comandoIndivual: string;
    private comandoGrupo: string;

    constructor(mero: Mero, palabra: string) {
        this.mero = mero;
        this.comandoIndivual = '/' + palabra;
        this.comandoGrupo = '/' + palabra + '@' + opciones.nombreBot;
    }

    activar(msg: Mensaje){
        if(msg.getTexto() === this.comandoIndivual || msg.getTexto() === this.comandoGrupo ){
            this.comando(msg);
        }
    }

    comando(msg: Mensaje){}

}

class EncuestaDia extends ComandoBase{

    constructor(mero: Mero) {
        super(mero, "encuesta_dia");
    }

    comando(msg: Mensaje){
        this.mero.enviarEncuesta(msg, "Dia de roleación", opciones.opcionesDias())
    }
}

class EncuestaHora extends ComandoBase{

    constructor(mero: Mero) {
        super(mero, "encuesta_hora");
    }

    comando(msg: Mensaje){
        this.mero.enviarEncuesta(msg, "Hora de roleación", opciones.opcionesHoras())
    }
}

class ConvertirDinero extends ComandoBase{

    constructor(mero: Mero) {
        super(mero, "convertir");


    }

    comando(msg: Mensaje) {
            let texto = msg.getTextoMinusculas().split(" ");

            if (texto.length < 2) {
                this.mero.enviarAviso(msg, "Vamos a convertir dineros\n" +
                    "Pasamelo de la forma: cantidad monedaOriginal monedaDestino\n" +
                    "Ej: 123 pc po | 2 pp po | 1 po pc", {"reply_markup": {"force_reply": true}}
                ).then(payload => {
                    this.mero.getBot().onReplyToMessage(payload.chat.id, payload.message_id, (msg) => {
                        msg = new Mensaje(msg);
                        if(msg.esTexto()) {
                            let texto = msg.getTextoMinusculas().split(" ");

                            let cantidad = texto[0];
                            let monedaOrg = texto[1];
                            let monedaObj = texto[2];

                            this.convertir(cantidad, monedaOrg, monedaObj, msg);
                        }else
                            this.mero.enviarAviso(msg, "Respondeme con texto anda");
                    })
                })
            } else {

                let cantidad = texto[1];
                let monedaOrg = texto[2];
                let monedaObj = texto[3];

                this.convertir(cantidad, monedaOrg, monedaObj, msg);
            }
    }



    private convertir(cantidad, monedaOrg, monedaObj, msg: Mensaje) {
        if (isNaN(cantidad)) {//Comprobamos el numero
            this.mero.enviarAviso(msg, "Comprueba que " + cantidad + " es un numero correcto");
            return;
        }
        if (!cambioMonedas.comprobarMoneda(monedaOrg)) {
            this.mero.enviarAviso(msg, "Comprueba que la primera moneda(" + monedaOrg + ") es una de estas " + cambioMonedas.getMonedas());
            return;
        }
        if (!cambioMonedas.comprobarMoneda(monedaObj)) {
            this.mero.enviarAviso(msg, "Comprueba que la moneda objetivo(" + monedaObj + ") es una de estas " + cambioMonedas.getMonedas());
            return;
        }

        let nuevaCantidad = cambioMonedas.convertir(cantidad, monedaOrg, monedaObj);
        this.mero.enviarAviso(msg, "Eso son " + nuevaCantidad + " " + monedaObj);
    }

}

class PoliSanchez extends ComandoBase{
    private polisanchez = [];
    private ruta = "../../../ficheros/fotos/";
    constructor(mero) {
        super(mero, "poliedro_sanchez");
        for (let i = 1; i <= 20; i++) {
            this.polisanchez.push("PS"+i+".png");
        }
    }

    comando(msg: Mensaje) {
        let direccion = path.resolve(__dirname, this.ruta + this.polisanchez[util.getRandomEntero(0, this.polisanchez.length)]);

        this.mero.enviarFoto(msg, direccion);
    }
}

class PowerRanger extends ComandoBase{
    private colores = ["Rojo","Negro","Blanco","Azul","Verde","Amarillo","Marron","CUM"];
    constructor(mero) {
        super(mero, "power_ranger");
    }

    comando(msg: Mensaje) {
        this.mero.enviarAviso(msg, this.colores[util.getRandomEntero(0, this.colores.length)]);
    }
}

export function cargarComandos(mero: Mero): Comando[]{
    let comandos = [];

    comandos.push(new EncuestaDia(mero));
    comandos.push(new EncuestaHora(mero));
    comandos.push(new ConvertirDinero(mero));
    comandos.push(new PoliSanchez(mero));
    comandos.push(new PowerRanger(mero));

     return comandos;
}
