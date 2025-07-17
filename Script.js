const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let isGameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  if (!isGameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index =>
      cells[index].textContent === currentPlayer
    );
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = 'Turn: X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
