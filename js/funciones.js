
function saltarMario() {
    mario.src = 'images/salto.gif';
    mario.style.bottom = '150px';
    marioSalta.play()
}

function avanzarMario() {
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
}

function retrocederMario() {
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
}


function bajarMario() {
    mario.src = 'images/mario-parado.gif';
    mario.style.bottom = '0px';
    if (movimientoTubo <= 600 && pasosMario >= 420 && pasosMario <= 480) {
        music.src = "";
        final.play();
        var winner = document.createElement('img');
        winner.id = 'winner';
        winner.src = 'images/winner.png';

        var restart = document.createElement('a');
        restart.id = 'restart';
        restart.href = '';
        escenario.appendChild(restart);
        restart.appendChild(winner);
    }

    for (goomba of arrayMalos) {
        var avanceMalo = goomba.style.left.replace('px', '') * 1;

        if (pasosMario >= avanceMalo - 220 && pasosMario <= avanceMalo - 150) {
            borrarMaloSaltando(goomba);
        }
    }
}


function corrccionEscenario() {
    if (pasosMario >= 350 && movimientoEscenario >= -3160) {
        pasosMario -= 500;
        movimientoEscenario -= 500;
        movimientoTubo -= 500;

        for (malo of arrayMalos) {
            var avanceMalo = malo.style.left.replace('px', '') * 1;
            avanceMalo -= 500; // El malo avanza, pero luego vuelve a su posición
            malo.style.left = avanceMalo + 'px';
        }
    }
}


function impactarMalo(pDisparo, pIntervalo) {

    for (malo of arrayMalos) {

        var avanceTiro = pDisparo.style.left.replace('px', '') * 1;
        var alturaTiro = pDisparo.style.top.replace('px', '') * 1;

        var avanceMalo = malo.style.left.replace('px', '') * 1;

        console.log('tiro' + avanceTiro, 'malo ' + malo.id + ' ' + avanceMalo)

        if (avanceTiro >= avanceMalo && avanceTiro <= avanceMalo + 40 && alturaTiro > 500) {
            malo.style.bottom = '-300px';
            goombaMuere.play();
            pintarMarcador()
            pDisparo.parentNode.removeChild(pDisparo);
            clearInterval(pIntervalo)
            break;
        }
    }
}

function pintarMarcador() {
    var marcador = (malosMuertos < 99) ? malosMuertos++ : malosMuertos = 0;
    muertes.innerText = malosMuertos;
}


function borrarMalo(pMalo) {
    pMalo.parentNode.removeChild(pMalo);
    clearInterval(intervaloBicho)
}


function borrarMaloSaltando(pGoomba) {
    pintarMarcador()
    pGoomba.style.bottom = '-300px';
    goombaMuere.play();
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

        music.src = "";
        marioMuereMusica.play();
        borrado = setTimeout(borrarMario, 500)
        marioVivo = false;
    }
}

function borrarMario() {
    mario.parentNode.removeChild(mario);
}