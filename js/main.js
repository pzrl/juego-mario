var escenario = document.querySelector('.escenario')
var movimientoEscenario = 0;

var mario = document.querySelector('#runner img');
var pasosMario = 0;
var marioMirando = 'derecha';
mario.style.bottom = '0px'
var marioMuereMusica = document.getElementById('marioMuere');
var arrayDisparos = new Array;

var tiempoIntervalo = 1000 + Math.random() * 3000;
var aparicionMalo = setInterval(sacarMalo, tiempoIntervalo)
var contadorId = 1;
var arrayMalos = new Array;

var tubo = document.querySelector('.tubo');
var movimientoTubo = 3800;

document.addEventListener('keyup', pararMario)
document.addEventListener('keydown', accionesMario)


function accionesMario(e) {

    if (pasosMario >= 550 && movimientoEscenario >= -3200) {
        pasosMario -= 800;
        movimientoEscenario -= 800;
        movimientoTubo -= 800;
    }
    else {

        switch (e.keyCode) {

            // SALTAR

            case 38: saltar(); break;

            //AVANZAR
            case 39: avanzar(); break;

            //RETROCEDER
            case 37: retroceder(); break;


            // DISPARAR
            case 32:

                var disparo = document.createElement('div');
                disparo.className = 'disparo';
                var avanceDisparo = mario.offsetLeft + 210;
                disparo.style.left = avanceDisparo + 'px';
                var descensoDisparo = mario.offsetTop + 520;
                disparo.style.top = descensoDisparo + 'px';
                escenario.appendChild(disparo);
                disparo.id = 'disparo' + contadorId;
                arrayDisparos.push(disparo)
                contadorId++;

                if (marioMirando == 'derecha') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo < 800) {
                            avanceDisparo += 40;
                            disparo.style.left = avanceDisparo + 'px';
                        }
                        else {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo) //REVISAR
                        }
                    }, 100)

                    break;
                }
                if (marioMirando == 'derecha' && mario.style.bottom == '150pxx') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo < 800) {
                            avanceDisparo += 40;
                            descensoDisparo += 15;
                            disparo.style.top = descensoDisparo + 'px';
                            disparo.style.left = avanceDisparo + 'px';
                        }
                        else {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo)//REVISAR
                        }

                    }, 100)

                    break;
                }
                if (marioMirando == 'izquierda') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo > -800) {
                            avanceDisparo -= 40;
                            disparo.style.left = avanceDisparo + 'px';
                        }
                        else {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo)//REVISAR
                        }

                    }, 100)

                    break;
                }
                if (marioMirando == 'izquierda' && mario.style.bottom === '150px') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo < 800) {
                            avanceDisparo -= 40;
                            descensoDisparo += 15;
                            disparo.style.top = descensoDisparo + 'px';
                            disparo.style.left = avanceDisparo + 'px';
                        }
                        else {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo)//REVISAR
                        }

                    }, 100)

                    break;
                }
        }
    }
}

function pararMario(e) {
    switch (e.keyCode) {
        case 39:
            mario.src = 'images/mario-parado.gif';
            break;
        case 38:
            mario.src = 'images/mario-parado.gif';
            mario.style.bottom = '0px';
            break;
        case 37:
            mario.src = 'images/mario-parado.gif';
            break;
    }
}

function sacarMalo() {
    if (movimientoTubo <= 680) {
        clearInterval(aparicionMalo);
    }
    else {
        clearInterval(aparicionMalo);
        tiempoIntervalo = 4000 + Math.random() * 3000;
        aparicionMalo = setInterval(sacarMalo, tiempoIntervalo);

        var malo = document.createElement('div');

        malo.className = 'malo';
        malo.id = 'malo' + contadorId;
        arrayMalos.push(malo)
        contadorId++;

        var avanceMalo = 820;

        escenario.appendChild(malo);
        var inetervaloBicho = setInterval(function () {
            if (avanceMalo > -200) {
                if (pasosMario >= 550 && movimientoEscenario >= -3200) {
                    avanceMalo -= 800;
                }
                avanceMalo -= 13;
                malo.style.left = avanceMalo + 'px';
                muerteMario(avanceMalo)
            }
            else {
                malo.parentNode.removeChild(malo);
                clearInterval(inetervaloBicho)
            }
        }, 100)
    }
}





// Eliminar a los bichos -> Darles ID(hecho), meterlos en array y jugar con altura y anchura para remove child.

// Que Mario caiga al saltar

// Que los bichos mueran al tirarles bolas o saltar sobre ellos y desaparezcan.

// Que los bichos le quiten vidas a mario

// Que el tubo no se pueda atravesar por los lados y al meterse FIN PARTIDA


