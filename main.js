const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.querySelector('[data-board]');
const winningMessageElement       = document.querySelector('[data-winning-message]');
const winningMessageTextElement   = document.querySelector('[data-winning-message-text]');
const winningMessageButtonElement = document.querySelector('[data-winning-message-button]');

let isCircleTurn; // undefined

// winning combinations
const winningCombinations = [
    [0, 1, 2], // first line
    [3, 4, 5], // second line
    [6, 7, 8], // third line

    [0, 3, 6], // first top to bottom
    [1, 4, 7], // second top to bottom
    [2, 5, 8], // third top to bottom

    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6] // top-right to bottom-left
]

// start game
const startGame = () => {
    isCircleTurn = false; // initial player

    for(const cell of cellElements) {
        // clean the game when click in restart button!
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)

        // add this event to all cells when start game
        cell.addEventListener('click', handleClick, {once: true})
        // {once: true} -> can run this event a single turn

    }

    setBoardHoverClass()
    winningMessageElement.classList.remove('show-winning-message')
}

// end game
const endGame = isDraw => {
    if(isDraw) {
        winningMessageTextElement.innerText = 'Draw'
    } else {
        winningMessageTextElement.innerText = isCircleTurn 
        ? 'Circle Win' 
        : 'X Win';
    }

    winningMessageElement.classList.add('show-winning-message')
}

// check if any player win
const checkForWin = currentPlayer => {
    // for each combination ->
    return winningCombinations.some(combination => {
        // verify each index of each combinations
        return combination.every(index => {
            // case have anything combination this function return -> true
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle') 
    })
}

// place a new mark
const placeMark = (cell, classToAdd) => cell.classList.add(classToAdd);

const setBoardHoverClass = () => {
    // remove class to prevents bugs
    boardElement.classList.remove('circle');
    boardElement.classList.remove('x');
    
    if(isCircleTurn) { // if false
        boardElement.classList.add('circle');
    } else {
        boardElement.classList.add('x');
    }
}

const swapTurn = () => {
    isCircleTurn = !isCircleTurn; // invert the bool value
    // IMPORTANT -> isCircleTurn is declared false(circle)
    // now the game is started true(x)
    // console.log(isCircleTurn)

    setBoardHoverClass();
}

const handleClick = (e) => {
    // place mark
    const cell = e.target; // verify the target cell
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // verify win/draw
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw()

    if(isWin) {
        endGame(false)
    } else if(isDraw) {
        endGame(true)
    } else {
        // change player
        swapTurn();
    }
}

startGame();

// reload game
winningMessageButtonElement.addEventListener('click', startGame)