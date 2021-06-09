"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensaje = void 0;
var Mensaje = /** @class */ (function () {
    function Mensaje(mensaje) {
        this.mensaje = mensaje;
    }
    Mensaje.prototype.getTextoMinusculas = function () {
        return this.mensaje.text.toLowerCase();
    };
    Mensaje.prototype.esTexto = function () {
        return this.mensaje.text && !this.mensaje.text.includes('/');
    };
    Mensaje.prototype.esComando = function () {
        return this.mensaje.text && this.mensaje.text.indexOf('/') === 0;
    };
    Mensaje.prototype.getTexto = function () {
        return this.mensaje.text;
    };
    Mensaje.prototype.getNombreEmisor = function () {
        return this.mensaje.from.first_name;
    };
    Mensaje.prototype.getIdChat = function () {
        return this.mensaje.chat.id;
    };
    return Mensaje;
}());
exports.Mensaje = Mensaje;
//# sourceMappingURL=mensaje.js.map