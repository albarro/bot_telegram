import {cargarActivaciones} from "../lectores/cargaActivaciones";
import {Activable} from "./opereraciones/respuestas";
import {Mensaje} from "./opereraciones/mensaje";
import {Comando, cargarComandos} from "./opereraciones/comandos";

const comprobadorSpam = require('../validadores/anti-spam');

export class Mero{
    private activadores: Activable[];
    private comandos: Comando[];
    private bot;

    constructor(bot) {
        this.bot = bot;
        cargarActivaciones(this.iniciarActivadores.bind(this));
        this.comandos = cargarComandos(this);
    }

    private iniciarActivadores(activadores: Activable[]){
        this.activadores = activadores;
    }

    public probarMensaje(msg: Object){
        let mensaje = new Mensaje(msg);
        if(mensaje.esTexto()) {
            for (const activador of this.activadores) {
                let respuesta = activador.activar(mensaje);
                if(respuesta){
                    return this.enviarTexto(mensaje, respuesta);
                }
            }
        }else if (mensaje.esComando()){
            for (const comando of this.comandos) {
                comando.activar(mensaje);
            }
        }
    }

    private enviarTexto(msg: Mensaje, texto:string, form?: object){
        if(this.comprobarSpam(msg)) {
            return this.bot.sendMessage(msg.getIdChat(), texto, form).catch((error) =>{
                this.reportarError(msg, error);
            });
        }
    }

    public enviarAviso(msg: Mensaje, texto:string, form?: object){
        return this.bot.sendMessage(msg.getIdChat(), texto, form).catch((error) =>{
            this.reportarError(msg, error);
        });
    }

    private comprobarSpam(mensaje: Mensaje){
        let respuesta = comprobadorSpam.probarUsuario(mensaje.getNombreEmisor());
        if(!respuesta[0]) {// Comprobamos que no sea spam, en el primer indice va el bool
            if(respuesta[1] < 2) { //Numero de intentos
                this.enviarAviso(mensaje,"Tranquilito " + mensaje.getNombreEmisor() + " esperate " + respuesta[2] + " segundos.");
            }else if(respuesta[1] > 1 && respuesta[1] < 3){
                this.enviarAviso(mensaje,"Se acabo tonto que eres tonto ya no te respondo por " + respuesta[2] + " segundos.");
            }
            console.log("Usuario:" + mensaje.getNombreEmisor() + " Spamea:" + respuesta[1]);
            return false;
        }else
            return true;
    }


    public enviarEncuesta(msg: Mensaje, pregunta:string, opcionesEncuesta: string[], anonima:boolean = false, respMultiple:boolean = true){
        if(this.comprobarSpam(msg)) {
           return this.bot.sendPoll(msg.getIdChat(), pregunta, opcionesEncuesta, {
                "is_anonymous": anonima,
                "allows_multiple_answers": respMultiple
            }).catch((error) =>{
               this.reportarError(msg, error);
           });;
        }
    }

    public enviarFoto(msg: Mensaje, foto:string){
        if(this.comprobarSpam(msg)){
            return this.bot.sendPhoto(msg.getIdChat(), foto).catch((error) =>{
                this.reportarError(msg, error, "Fallo en envio de la foto " + foto);
            });;
        }
    }

    public getBot(){
        return this.bot;
    }

    public reportarError(msg: Mensaje, error, añadido?){
        console.error(añadido);
        console.error(error.response.body);
        this.enviarAviso(msg, "Algo salio chamacotamente mal (" + error.code + ")");
    }

}
