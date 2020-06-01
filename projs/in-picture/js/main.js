'use strict';
var gQuests = createQuests();
var gCurrQuestIdx = 0;
var gNextId = 1;

function initGame() {
    createQuests();
    renderQuest();
}

function createQuests() {
    var quests = [];
    var quest1 = createQuest(['The bear shows his tongue', 'The bear sings a song'], 0, 'img/img1.jpg');
    quests.push(quest1);
    var quest2 = createQuest(['This is an observant Rabbi', 'This is an observant rabbit'], 1, 'img/img2.jpg');
    quests.push(quest2);
    var quest3 = createQuest(['Penguins are flightless birds', 'Penguins are frightless birds', 'Penguins are no birds at all'], 0, 'img/img3.jpg');
    quests.push(quest3);
    var quest4 = createQuest(['A family of solar bears', 'A family of polar bears'], 1, 'img/img4.jpg');
    quests.push(quest4);
    var quest5 = createQuest(['This hamster is not used to snow', 'This mini pig is not used to snow', 'This guinea pig is not used to snow'], 2, 'img/img5.jpg');
    quests.push(quest5);
    return quests;
}

function createQuest(opts, correctOptIdx, imgSrc) {
    var newQuest = {
        id: gNextId,
        opts: opts,
        correctOptIdx: correctOptIdx,
        img: imgSrc
    }
    return newQuest;
}

function renderQuest() {
    var elImg = document.querySelector('.image');
    elImg.src = gQuests[gCurrQuestIdx].img;
    renderOptions();
}

function renderOptions() {
    var strHtml = '<div>'
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        strHtml += `<button class="options option${i}" onclick="checkAnswer(this, ${i})">${gQuests[gCurrQuestIdx].opts[i]}</button><br>`;
    }
    strHtml += '</div>';
    var elOpts = document.querySelector('.answer-container');
    elOpts.innerHTML = strHtml;
}

function checkAnswer(elOpt, idx) {
    var correctOptIdx = gQuests[gCurrQuestIdx].correctOptIdx;
    if (idx === correctOptIdx) {
        elOpt.classList.add('correct');
        setTimeout(nextQuest, 1000);
        if (gCurrQuestIdx === gQuests.length - 1) winGame();
    } else {
        elOpt.classList.add('wrong');
        setTimeout(function () {
            elOpt.classList.remove('wrong');
        }, 1500);
    }
}

function nextQuest() {
    var elCorrect = document.querySelector('.correct');
    elCorrect.classList.remove('correct');
    gCurrQuestIdx++;
    renderQuest();
}

function winGame() {
    var elModal = document.querySelector('.modal');
    elModal.style.visibility = 'visible';
}

function restart() {
    gCurrQuestIdx = 0;
    var elModal = document.querySelector('.modal');
    elModal.style.visibility = 'hidden';
    initGame();
}