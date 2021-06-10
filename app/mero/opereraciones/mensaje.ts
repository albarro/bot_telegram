class Mensaje {
    private mensaje: any;

    constructor(mensaje:any) {
        this.mensaje = mensaje;
    }

    getTextoMinusculas(): string{

        return this.mensaje.text.toLowerCase();
    }

    esTexto(): boolean{
        return this.mensaje.text  && !this.mensaje.text.includes('/');
    }

    esComando(): boolean{
        return this.mensaje.text  && this.mensaje.text.indexOf('/') === 0;
    }

    getTexto(): string{
        return this.mensaje.text;
    }

    getNombreEmisor(): string{
        return this.mensaje.from.first_name;
    }

    getIdChat(): number{
        return this.mensaje.chat.id;
    }

}


export {Mensaje};
