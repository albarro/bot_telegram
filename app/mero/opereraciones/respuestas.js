"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respuesta = exports.Activador = void 0;
var opciones = require("../../lectores/opciones.js");
var Respuesta = /** @class */ (function () {
    function Respuesta(respuesta) {
        this.respuestaMap = respuesta;
    }
    Respuesta.prototype.activar = function (mensaje) {
        var respuesta = "";
        for (var _i = 0, _a = this.respuestaMap; _i < _a.length; _i++) {
            var resp = _a[_i];
            var key = Object.entries(resp)[0][0];
            var value = Object.entries(resp)[0][1];
            switch (key) {
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
    };
    return Respuesta;
}());
exports.Respuesta = Respuesta;
var Activador = /** @class */ (function () {
    function Activador(textoClave, hijos, condicion) {
        this.textoClave = textoClave.map(function (texto) { return texto.toLowerCase(); });
        this.hijos = hijos;
        if (condicion) {
            this.condicion = new Function("texto", "clave", condicion);
        }
        else {
            this.condicion = function (texto, clave) { return texto.includes(clave); };
        }
    }
    Activador.prototype.addHijo = function (hijo) {
        this.hijos.push(hijo);
    };
    Activador.prototype.activar = function (mensaje) {
        var _this = this;
        if (this.textoClave.some(function (r) { return _this.condicion(mensaje.getTextoMinusculas(), r); })) {
            return this.activarHijos(mensaje);
        }
        return "";
    };
    Activador.prototype.activarHijos = function (mensaje) {
        for (var _i = 0, _a = this.hijos; _i < _a.length; _i++) {
            var hijo = _a[_i];
            var res = hijo.activar(mensaje);
            if (res) {
                return res;
            }
        }
        return "";
    };
    return Activador;
}());
exports.Activador = Activador;
//# sourceMappingURL=respuestas.js.map