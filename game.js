'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🍩'
const EMPTY = ' '

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gWallsCount

function init() {
    const elBtn = document.querySelector('button')
    elBtn.classList.toggle('hide')
    const elMsg = document.querySelector('.massage')
    elMsg.classList.toggle('hide')



    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []
    gWallsCount = 0

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gWallsCount++
            }

            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8)
                board[i][j] = SUPER_FOOD

        }
    }

    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (getCountFood() === 0) isWinner()

}

function gameOver() {
    isWinner()
    const elBtn = document.querySelector('button')
    elBtn.classList.toggle('hide')
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    clearInterval(gIntervalGhosts)
}

function isWinner() {
    var counter = getCountFood()
    const elMsg = document.querySelector('.massage')


    elMsg.textContent = (!counter) ? 'YOU WON!' : 'YOU LOOSE!'

    // if (!counter) {
    //     elMsg.textContent = 'YOU WON!'
    // } else {
    //     elMsg.textContent = 'YOU LOOSE!'
    // }
    elMsg.classList.toggle('hide')
}

function getCountFood() {
    var countFood = 0

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            // console.log(gBoard[i][j]);
            if (gBoard[i][j] === FOOD) countFood++
        }
    }
    // console.log(countFood);
    return countFood - 1
}