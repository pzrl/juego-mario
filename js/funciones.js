


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


function matarBicho(pDisparo, pIntervalo) {

    for (malo of arrayMalos) {

        var avanceTiro = pDisparo.style.left.replace('px', '') * 1;

        var avanceMalo = malo.style.left.replace('px', '') * 1;

        console.log('disparo' + avanceTiro + ' - goomba' + avanceMalo)
        if (avanceTiro >= avanceMalo && avanceTiro <= avanceMalo + 40) {
            malo.style.bottom = '-300px';
            goombaMuere.play();
            borrarMalo(malo);
            pDisparo.parentNode.removeChild(pDisparo);
            clearInterval(pIntervalo)
            arrayDisparos.splice(contador, 1)// REVISAR
            break;
        }
    }
}


function borrarMalo(pMalo) {
    disparo.style.left = '900px';
    pMalo.parentNode.removeChild(pMalo);
}


function borrarMaloSaltando(pGoomba) {
    pGoomba.style.bottom = '-300px';
    goombaMuere.play();
    pGoomba.parentNode.removeChild(pGoomba);
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
        marioVivo = false;
    }
}


function borrarMario() {
    mario.parentNode.removeChild(mario);
}