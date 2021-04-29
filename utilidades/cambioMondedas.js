const monedas = {"pc":0,"pp":1, "pe":2, "po":3, "ppt":4};
const tpc =     [1,     1/10,   1/50,   1/100,  1/1000];
const tpp =     [10,    1,      1/5,    1/10,   1/100 ];
const tpe =     [50,    5,      1,      1/2,    1/20  ];
const tpo  =    [100,   10,     2,      1,      1/10  ];
const tppt =    [1000,  100,    20,     10,     1     ];
const tablas =  [tpc,   tpp,    tpe,    tpo,    tppt  ];

function convertir(cantidad, monedaOrg, monedaObj){
    return Math.round(cantidad * tablas[monedas[monedaOrg]][monedas[monedaObj]] * 100)/100;
}

function comprobarMoneda(texto){
    if(texto in monedas){
        return true;
    }

    return false;
}

function getMonedas(){
    let texto = "";
    for (let mon in monedas) {
        texto += mon + " ";
    }
    return texto;
}

const conversiones  = {
    convertir: convertir,
    comprobarMoneda: comprobarMoneda,
    getMonedas: getMonedas
}
module.exports = conversiones;

