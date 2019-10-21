var escenario = document.querySelector('.escenario')
var movimientoEscenario = 0;

var mario = document.querySelector('#runner img');
var pasosMario = 0;
var marioMirando = 'derecha';
mario.style.bottom = '0px'
var marioMuereMusica = document.getElementById('marioMuere');
var sonidoDisparos = document.getElementById('marioDispara');
var marioSalta = document.getElementById('marioSalta');
var final = document.getElementById('final');
var arrayDisparos = new Array;

var tiempoIntervalo = 1000 + Math.random() * 3000;
var aparicionMalo = setInterval(sacarMalo, tiempoIntervalo)
var goombaMuere = document.getElementById('goombaMuere');
var contadorId = 1;
var arrayMalos = new Array;

var tubo = document.querySelector('.tubo');
var movimientoTubo = 3800;

document.addEventListener('keyup', pararMario)
document.addEventListener('keydown', accionesMario)


function accionesMario(e) {

    if (pasosMario >= 350 && movimientoEscenario >= -3160) {
        pasosMario -= 500;
        movimientoEscenario -= 500;
        movimientoTubo -= 500;
    }
    else {

        switch (e.keyCode) {

            // SALTAR

            case 38:
                mario.src = 'images/salto.gif';
                mario.style.bottom = '150px';
                marioSalta.play()
                break;

            //AVANZAR
            case 39:
                if (pasosMario <= 650) {
                    pasosMario += 30;
                    mario.src = 'images/mario.gif';
                    mario.style.left = pasosMario + 'px';
                    mario.style.transform = 'rotateY(0deg)';
                    marioMirando = "derecha";
                }
                if (movimientoEscenario >= -3200 && (mario.style.bottom == '0px' || mario.style.bottom == '150px')) {
                    movimientoEscenario -= 30;
                    escenario.style.backgroundPosition = movimientoEscenario + 'px -150px';
                    movimientoTubo -= 30;
                    tubo.style.left = movimientoTubo + 'px';
                }
                break;

            //RETROCEDER
            case 37:
                if (pasosMario >= -110 && mario.style.bottom == '0px') {
                    pasosMario -= 60;
                    mario.style.left = pasosMario + 'px';
                    mario.src = 'images/mario.gif';
                    mario.style.transform = 'rotateY(180deg)';
                    marioMirando = "izquierda";
                }
                if (movimientoEscenario <= 0 && (mario.style.bottom == '0px' || mario.style.bottom == '150px')) {
                    movimientoEscenario += 10;
                    escenario.style.backgroundPosition = movimientoEscenario + 'px -150px';
                    movimientoTubo += 10;
                    tubo.style.left = movimientoTubo + 'px';
                }
                break;


            // DISPARAR
            case 32:

                var disparo = document.createElement('div');
                disparo.className = 'disparo';
                var avanceDisparo = mario.offsetLeft + 210;
                disparo.style.left = avanceDisparo + 'px';
                var descensoDisparo = mario.offsetTop + 520;
                disparo.style.top = descensoDisparo + 'px';
                escenario.appendChild(disparo);
                marioDispara.play();
                disparo.id = 'disparo' + contadorId;
                arrayDisparos.push(disparo)
                contadorId++;

                if (marioMirando == 'derecha') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo < 900) {
                            avanceDisparo += 40;
                            disparo.style.left = avanceDisparo + 'px';
                            matarBicho();

                        }
                        if (avanceDisparo >= 900) {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo) //REVISAR
                        }
                    }, 100)

                    break;
                }
                /*                 if (marioMirando == 'derecha' && mario.style.bottom == '150px') {
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
                                }*/
                if (marioMirando == 'izquierda') {
                    var intervaloDisparo = setInterval(function () {
                        if (avanceDisparo > -100) {
                            avanceDisparo -= 40;
                            disparo.style.left = avanceDisparo + 'px';
                            matarBicho();
                        }
                        if (avanceDisparo <= -100) {
                            disparo.parentNode.removeChild(disparo);
                            clearInterval(intervaloDisparo) //REVISAR
                        }

                    }, 100)

                    break;
                }




            /* if (marioMirando == 'izquierda' && mario.style.bottom === '150px') {
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
            } */
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
            if (movimientoTubo <= 600 && pasosMario >= 420 && pasosMario <= 480) {
                final.play()
                var winner = document.createElement('img');
                winner.id = 'winner'
                winner.src = 'images/winner.png';

                var restart = document.createElement('a');
                restart.id = 'restart';
                restart.href = '';
                escenario.appendChild(restart)
                restart.appendChild(winner);
            }

            for (goomba of arrayMalos) {
                var avanceMalo = goomba.style.left.replace('px', '') * 1;

                if (pasosMario >= avanceMalo - 220 && pasosMario <= avanceMalo - 150) {
                    borrado = setTimeout(borrarMaloSaltando, 200)
                }
            }


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
            if (malo.style.bottom == '-300px') {
                malo.parentNode.removeChild(malo);
                clearInterval(intervaloBicho);
            }
            if (avanceMalo > -200) {
                /*   if (pasosMario >= 350 && movimientoEscenario >= -3200) {// NO FUNCIONA BIEN
                      avanceMalo -= 500;
                  } */
                avanceMalo -= 5;
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

function muerteMario(pAvanceMalo) {
    if (pasosMario >= pAvanceMalo - 230 && pasosMario <= pAvanceMalo - 220 && mario.style.bottom == '0px') {
        mario.style.bottom = '-300px';
        var gameOver = document.createElement('img');
        gameOver.id = 'gameover'
        gameOver.src = 'images/game-over.png';
        var restart = document.createElement('a');
        restart.id = 'restart';
        restart.href = '';

        escenario.appendChild(restart);
        restart.appendChild(gameOver);

        marioMuereMusica.play();
        borrado = setTimeout(borrarMario, 500)
    }
}
function borrarMario() {
    mario.parentNode.removeChild(mario);
}

// MATAR BICHO
function matarBicho() {
    for (malo of arrayMalos) {

        for (disparo of arrayDisparos) {

            var avanceDisparo = disparo.style.left.replace('px', '') * 1;

            var avanceMalo = malo.style.left.replace('px', '') * 1;

            if (avanceDisparo >= avanceMalo && avanceDisparo <= avanceMalo + 40) {
                malo.style.bottom = '-300px';
                goombaMuere.play();
                clearInterval(inetervaloDisparo)
                disparo.parentNode.removeChild(disparo);
                borrado = setTimeout(borrarMalo, 500);
                break;
            }

        }
    }
}
function borrarMalo(pMalo) {
    disparo.style.left = '900px';
    pMalo.parentNode.removeChild(pMalo);
}
function borrarMaloSaltando() {
    goomba.style.bottom = '-300px';
    goombaMuere.play();
    disparo.style.left = '900px';
    goomba.parentNode.removeChild(pMalo);
}



/* PROBLEMAS:

- quitar malos eliminados correctamente
- quitar balas correctamente
- si avanza mario, las balas desaparecen antes
- la correción del escenario no acaba de funcionar con los malos
- disparos desde altura
- las balas no matan a la derecha del escenario


*/

/* PENDIENTE:

Que Mario caiga al saltar

Que los bichos mueran al saltar sobre ellos y desaparezcan.

Que el tubo no se pueda atravesar por los lados.

Musica de juego

*/




