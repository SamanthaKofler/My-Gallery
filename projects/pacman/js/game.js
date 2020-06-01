'use strict';
const WALL = '🏢';
const FOOD = '🍪';
const SUPERFOOD = '🍧';
const EMPTY = ' ';
const CHERRY = '🍒';

var gIntervalCherry;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
  isVictorious: false,
  foodCount: -1, // -1 cz of pacman himself
  collectedFood: 0
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gIntervalCherry = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if ((i === 1 || i === SIZE - 2) && (j === 1 || j === SIZE - 2)) {
        board[i][j] = SUPERFOOD;
      }
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      } else gGame.foodCount++;
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  gGame.collectedFood++;
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gIntervalCherry);
  gIntervalCherry = null;
  if (gGame.isVictorious) {
    var elVictoryModal = document.querySelector('.victory');
    elVictoryModal.style.visibility = 'visible';
  } else {
    var elGameOverModal = document.querySelector('.game-over');
    elGameOverModal.style.visibility = 'visible';
  }
}

function restart() {
  gGame.score = 0;
  gGame.isVictorious = false;
  gGame.foodCount = -1;
  gGame.collectedFood = 0;
  var elModals = document.querySelectorAll('.modal');
  for (var i = 0; i < elModals.length; i++) {
    elModals[i].style.visibility = 'hidden';
  }
  init();
}

function addCherry() {
  var randLocation = getRandomEmptyLocation();
  gBoard[randLocation.i][randLocation.j] = CHERRY;
  renderCell(randLocation, CHERRY);
  gGame.foodCount++;
}

function getRandomEmptyLocation() {
  var empties = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var location = { i: i, j: j };
      if (gBoard[i][j] === EMPTY) {
        empties.push(location);
      }
    }
  }
  var randIdx = getRandomIntInclusive(0, empties.length - 1);
  return empties[randIdx];
}