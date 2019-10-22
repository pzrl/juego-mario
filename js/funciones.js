


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

