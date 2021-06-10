"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mero = void 0;
var cargaActivaciones_1 = require("../lectores/cargaActivaciones");
var mensaje_1 = require("./opereraciones/mensaje");
var comandos_1 = require("./opereraciones/comandos");
var comprobadorSpam = require('../validadores/anti-spam');
var Mero = /** @class */ (function () {
    function Mero(bot) {
        this.bot = bot;
        cargaActivaciones_1.cargarActivaciones(this.iniciarActivadores.bind(this));
        this.comandos = comandos_1.cargarComandos(this);
    }
    Mero.prototype.iniciarActivadores = function (activadores) {
        this.activadores = activadores;
    };
    Mero.prototype.probarMensaje = function (msg) {
        var mensaje = new mensaje_1.Mensaje(msg);
        if (mensaje.esTexto()) {
            for (var _i = 0, _a = this.activadores; _i < _a.length; _i++) {
                var activador = _a[_i];
                var respuesta = activador.activar(mensaje);
                if (respuesta) {
                    return this.enviarTexto(mensaje, respuesta);
                }
            }
        }
        else if (mensaje.esComando()) {
            for (var _b = 0, _c = this.comandos; _b < _c.length; _b++) {
                var comando = _c[_b];
                comando.activar(mensaje);
            }
        }
    };
    Mero.prototype.enviarTexto = function (msg, texto, form) {
        var _this = this;
        if (this.comprobarSpam(msg)) {
            return this.bot.sendMessage(msg.getIdChat(), texto, form).catch(function (error) {
                _this.reportarError(msg, error);
            });
        }
    };
    Mero.prototype.enviarAviso = function (msg, texto, form) {
        var _this = this;
        return this.bot.sendMessage(msg.getIdChat(), texto, form).catch(function (error) {
            _this.reportarError(msg, error);
        });
    };
    Mero.prototype.comprobarSpam = function (mensaje) {
        var respuesta = comprobadorSpam.probarUsuario(mensaje.getNombreEmisor());
        if (!respuesta[0]) { // Comprobamos que no sea spam, en el primer indice va el bool
            if (respuesta[1] < 2) { //Numero de intentos
                this.enviarAviso(mensaje, "Tranquilito " + mensaje.getNombreEmisor() + " esperate " + respuesta[2] + " segundos.");
            }
            else if (respuesta[1] > 1 && respuesta[1] < 3) {
                this.enviarAviso(mensaje, "Se acabo tonto que eres tonto ya no te respondo por " + respuesta[2] + " segundos.");
            }
            console.log("Usuario:" + mensaje.getNombreEmisor() + " Spamea:" + respuesta[1]);
            return false;
        }
        else
            return true;
    };
    Mero.prototype.enviarEncuesta = function (msg, pregunta, opcionesEncuesta, anonima, respMultiple) {
        var _this = this;
        if (anonima === void 0) { anonima = false; }
        if (respMultiple === void 0) { respMultiple = true; }
        if (this.comprobarSpam(msg)) {
            return this.bot.sendPoll(msg.getIdChat(), pregunta, opcionesEncuesta, {
                "is_anonymous": anonima,
                "allows_multiple_answers": respMultiple
            }).catch(function (error) {
                _this.reportarError(msg, error);
            });
            ;
        }
    };
    Mero.prototype.enviarFoto = function (msg, foto) {
        var _this = this;
        if (this.comprobarSpam(msg)) {
            return this.bot.sendPhoto(msg.getIdChat(), foto).catch(function (error) {
                _this.reportarError(msg, error, "Fallo en envio de la foto " + foto);
            });
            ;
        }
    };
    Mero.prototype.getBot = function () {
        return this.bot;
    };
    Mero.prototype.reportarError = function (msg, error, añadido) {
        console.error(añadido);
        console.error(error.response.body);
        this.enviarAviso(msg, "Algo salio chamacotamente mal (" + error.code + ")");
    };
    return Mero;
}());
exports.Mero = Mero;
//# sourceMappingURL=mero.js.map