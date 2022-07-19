'use strict'

const PACMAN = '😷';
var gPacman;
var gDeadGhosts = []
var gIntervalAlive

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === SUPER_FOOD) superPowerHandler()

    else if (nextCell === GHOST) {
        // debugger
        if (!gPacman.isSuper) {
            gameOver()
            // renderCell(gPacman.location, EMPTY)
            return
        } else {
            // console.log('gGhosts[i].location.i:', gGhosts[0].location.i)
            for (let i = 0; i < gGhosts.length; i++) {
                // console.log('gGhosts[i].location.i:', gGhosts[i]['location'].i)
                // console.log('gDIeGhosts:', gDIeGhosts)
                // debugger
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {

                    gDeadGhosts.push(gGhosts.splice(i, 1)[0])
                    // alive()
                }

            }
            gIntervalAlive = setTimeout(() => {
                gPacman.isSuper = false
                // console.log('gDIeGhosts:', gDeadGhosts)
                // console.log('gGhosts:', gGhosts)
                gGhosts = [...gDeadGhosts, ...gGhosts];

                gDeadGhosts.splice()

            }, 5000);
            console.log('gDIeGhosts:', gDeadGhosts)

            // gPacman.location.i gPacman.location.j
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function superPowerHandler() {
    for (let i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = "blue"
        renderCell(gGhosts[i].location, GHOST)
    }
    gPacman.isSuper = true
}
