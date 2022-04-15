//buggytown
const ticTac = Array.from(document.querySelectorAll('[data-tic-tac]'));
const resetBtn = document.querySelector('[data-reset]');
const winner = document.getElementById('winner');
board = ['', '', '', '', '', '', '', '', ''];
let player = "X";
let isGameActive = true;

const playerX_won = 'X won';  
const playerO_won = 'O won';
const tie = 'tie';

const winningCondtitions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

function handleResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCondtitions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
if (roundWon) {
        announce(player === "X" ? playerX_won : playerO_won);
        isGameActive = false;
        return;
    }
if (!board.includes('')) 
    announce(tie);
}

const announce = (type) => {
    switch(type) {
        case playerO_won:
            winner.innerText = playerO_won;
            break;
        case playerX_won:
            winner.innerText = playerX_won;
            break;
        case tie:
            winner.innerText = tie;
            break;
    }
}

const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
    }

    return true;
}

const updateBoard = (index) => {
    board[index] = player;
}

const changePlayer = () => {
    player = player === "X" ? "O" : "X";
}

const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = player;
        updateBoard(index);
        handleResult();
        changePlayer();
    }
};

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    winner.innerText = 'X vs O';

    if (player === "O") {
        changePlayer();
    }

    ticTac.forEach(tile => {
        tile.innerText = '';
    });
}

ticTac.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

resetBtn.addEventListener('click', resetBoard);
