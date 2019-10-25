// SONIDOS
music.play();
setTimeout(function () {
    var start = document.querySelector('.start');
    start.style.display = 'none';
}, 3000);
var marioMuereMusica = document.getElementById('marioMuere');
var sonidoDisparos = document.getElementById('marioDispara');
var marioSalta = document.getElementById('marioSalta');
var goombaMuere = document.getElementById('goombaMuere');
var final = document.getElementById('final');

// ESCENARIO
var escenario = document.querySelector('.escenario')
var movimientoEscenario = 0;
var muertes = document.querySelector('.muertes');

// MARIO
var mario = document.querySelector('#runner img');
var pasosMario = 0;
var marioMirando = 'derecha';
mario.style.bottom = '0px'
var arrayDisparos = new Array;

// GOOMBAS
var tiempoIntervalo = 1000 + Math.random() * 3000;
var aparicionMalo = setInterval(sacarMalo, tiempoIntervalo)
var contadorId = 1;
var arrayMalos = new Array;
var malosMuertos = 0;

//TUBO
var tubo = document.querySelector('.tubo');
var movimientoTubo = 3800;

// LLAMADA EVENTOS TECLADO
document.addEventListener('keyup', pararMario)
document.addEventListener('keydown', accionesMario)

// FUNCIONES Y EVENTOS

function accionesMario(e) {

    corrccionEscenario() // Esto funciona bien para mario, el tubo y el escenario, pero con los malos una vez corregida su posición, retoman la posición anterior ya que su intervalo de movimiento vuelve a cambiar la posición left.

    switch (e.keyCode) {

        // SALTAR

        case 38:
            saltarMario();
            break;

        //AVANZAR
        case 39:
            avanzarMario();
            break;

        //RETROCEDER
        case 37:
            retrocederMario();
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

            if (marioMirando == 'derecha' && mario.style.bottom == '0px') {
                var intervaloDisparo = setInterval(function () {
                    if (avanceDisparo < 850) {
                        avanceDisparo += 40;
                        console.log(descensoDisparo)
                        disparo.style.left = avanceDisparo + 'px';
                    }

                    impactarMalo(disparo, intervaloDisparo);

                    if (avanceDisparo >= 850) {
                        disparo.parentNode.removeChild(disparo);
                        clearInterval(intervaloDisparo);
                    }

                }, 100)
                break;
            }
            if (marioMirando == 'derecha' && mario.style.bottom != '0px') {
                var intervaloDisparo = setInterval(function () {
                    if (avanceDisparo < 850) {
                        avanceDisparo += 40;
                        descensoDisparo += 15;
                        console.log(descensoDisparo)
                        disparo.style.top = descensoDisparo + 'px';
                        disparo.style.left = avanceDisparo + 'px';
                    }

                    impactarMalo(disparo, intervaloDisparo);

                    if (avanceDisparo >= 850) {
                        disparo.parentNode.removeChild(disparo);
                        clearInterval(intervaloDisparo);
                    }

                }, 100)
                break;
            }
            if (marioMirando == 'izquierda' && mario.style.bottom == '0px') {
                var intervaloDisparo = setInterval(function () {
                    if (avanceDisparo > -200) {
                        avanceDisparo -= 40;
                        disparo.style.left = avanceDisparo + 'px';
                    }

                    impactarMalo(disparo, intervaloDisparo);

                    if (avanceDisparo <= -200) {
                        disparo.parentNode.removeChild(disparo);
                        clearInterval(intervaloDisparo);
                    }

                }, 100)
                break;
            }
            if (marioMirando == 'izquierda' && mario.style.bottom != '0px') {
                var intervaloDisparo = setInterval(function () {
                    if (avanceDisparo > -200) {
                        avanceDisparo -= 40;
                        descensoDisparo += 15;
                        disparo.style.top = descensoDisparo + 'px';
                        disparo.style.left = avanceDisparo + 'px';
                    }

                    impactarMalo(disparo, intervaloDisparo);

                    if (avanceDisparo <= -200) {
                        disparo.parentNode.removeChild(disparo);
                        clearInterval(intervaloDisparo) //REVISAR
                    }

                }, 100)
                break;
            }
    }
}


function pararMario(e) {
    switch (e.keyCode) {
        case 39:
            mario.src = 'images/mario-parado.gif';
            break;
        case 38:
            bajarMario();
            break;
        case 37:
            mario.src = 'images/mario-parado.gif';
            break;
    }
}


// GOOMBAS
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
        var inetervaloBicho = setInterval(function () { // Aquí habría que pasar la poiscion de avance malo en cada corrección de escenario, pero no sé como hacerlo. Si ponemos aqui la corrección especifica para los malos no funciona

            if (malo.style.bottom == '-300px') {
                avanceMalo += 100;
            }
            if (avanceMalo > -200 && malo.style.bottom != '-300px') {
                avanceMalo -= 6;
                malo.style.left = avanceMalo + 'px';
                muerteMario(avanceMalo)
            }
            else {
                console.log(malo)
                malo.parentNode.removeChild(malo);
                clearInterval(inetervaloBicho)
            }
        }, 100)
    }
}


/* PROBLEMAS:

- las balas al principio funcionan, pero al poco comienzan a fallar (desaparecen antes y matan a malos con los que no chocan)
- la correción del escenario no acaba de funcionar con los malos

*/




