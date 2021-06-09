// Retorna un número aleatorio entre min (incluido) y max (excluido)
// Floor para eliminar decimales
function getRandomEntero(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const utilidades = {
    getRandomEntero: getRandomEntero,
};
module.exports = utilidades;
