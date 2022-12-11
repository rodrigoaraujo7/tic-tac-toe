const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.querySelector('[data-board]');

let isCircleTurn; // undefined

const winningCombination = () => {
    [0, 1, 2], // first line
    [3, 4, 5], // second line
    [6, 7, 8], // third line

    [0, 3, 6], // first top to bottom
    [1, 4, 7], // second top to bottom
    [2, 5, 8], // third top to bottom
    
    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6] // top-right to bottom-left
}

const startGame = () => {
    for(const cell of cellElements) {
        // add this event to all cells
        cell.addEventListener('click', handleClick, {once: true})
        // {once: true} -> can run this event a single turn
    }

    isCircleTurn = false; // initial player
    boardElement.classList.add('x')
}

// place a new mark
const placeMark = (cell, classToAdd) => cell.classList.add(classToAdd);

const swapTurn = () => {
    isCircleTurn = !isCircleTurn; // invert the bool value
    // IMPORTANT -> isCircleTurn is declared false(circle)
    // now the game is started true(x)
    // console.log(isCircleTurn)

    // remove class to prevents bugs
    boardElement.classList.remove('circle');
    boardElement.classList.remove('x');
    
    if(isCircleTurn) { // if false
        boardElement.classList.add('circle');
    } else {
        boardElement.classList.add('x');
    }
}

const handleClick = (e) => {
    // place mark
    const cell = e.target; // verify the target cell
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // change player
    swapTurn();
}

startGame();