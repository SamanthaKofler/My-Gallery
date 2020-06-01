const PACMAN = '🐵';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  var nextPosition = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  var nextLocation = nextPosition.nextLocation
  var rotation = nextPosition.rotation

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  if (nextCell === SUPERFOOD && gPacman.isSuper) return;

  var elCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
  elCell.style.transform = rotation;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    checkVictory();
  }
  if (nextCell === SUPERFOOD) {
    updateScore(1);
    checkVictory();
    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = 'blue';
    }
    setTimeout(removeSuper, 5000);
  }
  if (nextCell === CHERRY) {
    updateScore(10);
    checkVictory();
  }
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
          gGhosts.splice(i, 1);
        }
      }
      // if (gBoard[nextLocation.i][nextLocation.j].currCellContent !== EMPTY) {
      //   console.log(gBoard[nextLocation.i][nextLocation.j])
      //   updateScore(1);
      // }
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };
  var rotation;

  // TODO: remove duplicated code, and unnecessary code from function
  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      rotation = 'rotate(180deg)';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      rotation = 'rotate(0deg)';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      rotation = 'rotate(90deg)';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      rotation = 'rotate(270deg)';
      break;
    default: return null;
  }
  // if (nextCell === WALL || nextCell === SUPERFOOD && gPacman.isSuper) return;
  // var elCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
  // elCell.style.transform = rotation;

  //  return nextLocation;
  return {
    nextLocation: nextLocation,
    rotation: rotation
  }
}

function removeSuper() {
  gPacman.isSuper = false;
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = getRandomColor();
  }
  if (gGhosts.length !== 3) {
    var neededGhosts = 3 - gGhosts.length;
    for (var i = 0; i < neededGhosts; i++) {
      var newGhost = {
        location: {
          i: 3,
          j: 3
        },
        currCellContent: EMPTY,
        color: getRandomColor()
      }
      gGame.collectedFood++;
      gGhosts.push(newGhost);
    }
  }
}

function checkVictory() {
  if (gGame.foodCount === gGame.collectedFood) {
    gGame.isVictorious = true;
    gameOver();
  }
}