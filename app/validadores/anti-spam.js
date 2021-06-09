const usuarios = new Map();
const esperaMensajes = 5 * 1000; //Espera entre mensajes segundos -> ms

class controladorTemporal{

    constructor() {
        this.tiempoInicial = Date.now();
        this.limite = esperaMensajes;

        this.intentos = 0;
    }

    probarValided(){
        this.tiempoActual = Date.now();
        let dif = this.tiempoActual - this.tiempoInicial;

        if(dif < this.limite){ // diferencia menor que el limite, por lo tanto spam
            this.intentos += 1;
            let tiemporestante = Math.floor((this.limite - dif)/1000);
            return [false, this.intentos, tiemporestante]; //No valido, numero de intentos, tiempo de espera
        }else{
            this.intentos = 0;
            this.tiempoInicial = this.tiempoActual;//Actualizamos el tiempo de referencia
            return [true]; //Valido
        }
    }

}

function probarUsuario(usuario){
    let controlador = usuarios.get(usuario); //Intentamos obtener el controlador asociado al usuario
    if(controlador){
        return controlador.probarValided();
    }else{
        usuarios.set(usuario, new controladorTemporal());
        return [true];
    }
}

const comprobaciones  = {
    probarUsuario: probarUsuario
}
module.exports = comprobaciones;
