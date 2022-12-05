'use strict'


const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🍩'
const EMPTY = ' '
var countFood 

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
    countFood = getFoodCount()

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
    countFood -= 1
    document.querySelector('h2 span').innerText = gGame.score
    if (countFood === 0) isWinner()

}

function gameOver() {
    isWinner()
    renderCell(gPacman.location, '🪦')
}

function isWinner() {
    const elMsg = document.querySelector('.massage')
    elMsg.textContent = (countFood === 0) ? 'YOU WON!' : 'YOU LOOSE!'
    elMsg.classList.toggle('hide')

    const elBtn = document.querySelector('button')
    elBtn.classList.toggle('hide')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
}

function getFoodCount() {
    var countFood = 0

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) countFood++
        }
    }
    return countFood + 1
}