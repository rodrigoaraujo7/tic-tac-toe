const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.querySelector('[data-board]');

let isCircleTurn; // undefined

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
    const cell = e.target; // verify the target cell
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    swapTurn();
}

startGame();