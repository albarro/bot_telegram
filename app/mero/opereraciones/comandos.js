"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarComandos = void 0;
var mensaje_1 = require("./mensaje");
var path = require('path');
var opciones = require("../../lectores/opciones");
var cambioMonedas = require("../../utilidades/cambioMondedas");
var util = require("../../utilidades/util");
var ComandoBase = /** @class */ (function () {
    function ComandoBase(mero, palabra) {
        this.mero = mero;
        this.comandoIndivual = '/' + palabra;
        this.comandoGrupo = '/' + palabra + '@' + opciones.nombreBot;
    }
    ComandoBase.prototype.activar = function (msg) {
        if (msg.getTexto() === this.comandoIndivual || msg.getTexto() === this.comandoGrupo) {
            this.comando(msg);
        }
    };
    ComandoBase.prototype.comando = function (msg) { };
    return ComandoBase;
}());
var EncuestaDia = /** @class */ (function (_super) {
    __extends(EncuestaDia, _super);
    function EncuestaDia(mero) {
        return _super.call(this, mero, "encuesta_dia") || this;
    }
    EncuestaDia.prototype.comando = function (msg) {
        this.mero.enviarEncuesta(msg, "Dia de roleación", opciones.opcionesDias());
    };
    return EncuestaDia;
}(ComandoBase));
var EncuestaHora = /** @class */ (function (_super) {
    __extends(EncuestaHora, _super);
    function EncuestaHora(mero) {
        return _super.call(this, mero, "encuesta_hora") || this;
    }
    EncuestaHora.prototype.comando = function (msg) {
        this.mero.enviarEncuesta(msg, "Hora de roleación", opciones.opcionesHoras());
    };
    return EncuestaHora;
}(ComandoBase));
var ConvertirDinero = /** @class */ (function (_super) {
    __extends(ConvertirDinero, _super);
    function ConvertirDinero(mero) {
        return _super.call(this, mero, "convertir") || this;
    }
    ConvertirDinero.prototype.comando = function (msg) {
        var _this = this;
        var texto = msg.getTextoMinusculas().split(" ");
        if (texto.length < 2) {
            this.mero.enviarAviso(msg, "Vamos a convertir dineros\n" +
                "Pasamelo de la forma: cantidad monedaOriginal monedaDestino\n" +
                "Ej: 123 pc po | 2 pp po | 1 po pc", { "reply_markup": { "force_reply": true } }).then(function (payload) {
                _this.mero.getBot().onReplyToMessage(payload.chat.id, payload.message_id, function (msg) {
                    msg = new mensaje_1.Mensaje(msg);
                    if (msg.esTexto()) {
                        var texto_1 = msg.getTextoMinusculas().split(" ");
                        var cantidad = texto_1[0];
                        var monedaOrg = texto_1[1];
                        var monedaObj = texto_1[2];
                        _this.convertir(cantidad, monedaOrg, monedaObj, msg);
                    }
                    else
                        _this.mero.enviarAviso(msg, "Respondeme con texto anda");
                });
            });
        }
        else {
            var cantidad = texto[1];
            var monedaOrg = texto[2];
            var monedaObj = texto[3];
            this.convertir(cantidad, monedaOrg, monedaObj, msg);
        }
    };
    ConvertirDinero.prototype.convertir = function (cantidad, monedaOrg, monedaObj, msg) {
        if (isNaN(cantidad)) { //Comprobamos el numero
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
        var nuevaCantidad = cambioMonedas.convertir(cantidad, monedaOrg, monedaObj);
        this.mero.enviarAviso(msg, "Eso son " + nuevaCantidad + " " + monedaObj);
    };
    return ConvertirDinero;
}(ComandoBase));
var PoliSanchez = /** @class */ (function (_super) {
    __extends(PoliSanchez, _super);
    function PoliSanchez(mero) {
        var _this = _super.call(this, mero, "poliedro_sanchez") || this;
        _this.polisanchez = [];
        _this.ruta = "../../../ficheros/fotos/";
        for (var i = 1; i <= 20; i++) {
            _this.polisanchez.push("PS" + i + ".png");
        }
        return _this;
    }
    PoliSanchez.prototype.comando = function (msg) {
        var direccion = path.resolve(__dirname, this.ruta + this.polisanchez[util.getRandomEntero(0, this.polisanchez.length)]);
        this.mero.enviarFoto(msg, direccion);
    };
    return PoliSanchez;
}(ComandoBase));
var PowerRanger = /** @class */ (function (_super) {
    __extends(PowerRanger, _super);
    function PowerRanger(mero) {
        var _this = _super.call(this, mero, "power_ranger") || this;
        _this.colores = ["Rojo", "Negro", "Blanco", "Azul", "Verde", "Amarillo", "Marron", "CUM"];
        return _this;
    }
    PowerRanger.prototype.comando = function (msg) {
        this.mero.enviarAviso(msg, this.colores[util.getRandomEntero(0, this.colores.length)]);
    };
    return PowerRanger;
}(ComandoBase));
function cargarComandos(mero) {
    var comandos = [];
    comandos.push(new EncuestaDia(mero));
    comandos.push(new EncuestaHora(mero));
    comandos.push(new ConvertirDinero(mero));
    comandos.push(new PoliSanchez(mero));
    comandos.push(new PowerRanger(mero));
    return comandos;
}
exports.cargarComandos = cargarComandos;
//# sourceMappingURL=comandos.js.map