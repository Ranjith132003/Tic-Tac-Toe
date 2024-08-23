const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');

let currentPlayer = 'X';
let isComputerMode = false;
let board = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes('')) return 'Tie';

    return null;
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `Player ${winner} Wins!`;
        }
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    if (isComputerMode && currentPlayer === 'O') {
        setTimeout(() => {
            computerMove();
        }, 500);
    }
}

function computerMove() {
    const emptyCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `Player ${winner} Wins!`;
        }
        return;
    }

    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function toggleMode() {
    isComputerMode = !isComputerMode;
    modeButton.textContent = isComputerMode ? 'Switch to Two Player Mode' : 'Switch to Computer Mode';
    resetGame();
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
modeButton.addEventListener('click', toggleMode);

// Initialize
resetGame();
