'use strict';

var gBalloons = [
    { id: 1, bottom: 0, speed: 40 },
    { id: 2, bottom: 0, speed: 10 },
    { id: 3, bottom: 0, speed: 20 },
    { id: 4, bottom: 0, speed: 30 },
    { id: 5, bottom: 0, speed: 50 }
]

var gInterval;

function init() {
    renderBalloons();
    gInterval = setInterval(moveUp, 500);
}

function renderBalloons() {
    var strHtml = '';
    for (var i = 1; i <= gBalloons.length; i++) {
        strHtml += '<div class="balloon balloon' + i + '" onclick="popBalloon(this)"></div>';
    }
    var elBalloons = document.querySelector('.balloon-container');
    elBalloons.innerHTML = strHtml;
}

function moveUp() {
    var elBalloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        balloon.bottom += balloon.speed;
        var elBalloon = elBalloons[i];
        elBalloon.style.bottom = balloon.bottom + 'px';
        if (balloon.bottom > 550) {
            clearInterval(gInterval);
        }
    }
}

function popBalloon(elBalloon) {
    var audio = new Audio('pop.wav');
    audio.play();
    elBalloon.classList.add('fade');
}