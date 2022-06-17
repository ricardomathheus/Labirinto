// labirinto
const htmlMaze = document.querySelector('main')

// gerar labirinto

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
]

const mazeMap = map.map(element => element.split(''))

const mazeRow = mazeMap.map(elementArray => {
    let row = ''
    elementArray.forEach(element => {
/*         if (element === 'W') {
            row += '<div class="wall"></div>'
        }else if(element === ' '){
            row += '<div class="way"></div>'
        }else if(element === 'S'){
            row += '<div class="start" id="start">Start</div>'
        }else if(element === 'F'){
            row += '<div class="final" id="final">End</div>'
        }else{
            console.log('algo deu errado')
        } */

        const elementsList = {
            W: '<div class="wall"></div>',
            ' ': '<div class="way"></div>',
            S: '<div class="start" id="start">Start</div>',
            F: '<div class="final" id="final">End</div>'
        }
 
        if (elementsList[element]) {
            row += elementsList[element]
        }
    })

    return `<div class="mazeRow">${row}<div>`
})

mazeRow.forEach(element => {
    htmlMaze.innerHTML += element
})

// mecanicas do labirinto
const start = document.querySelector('#start')
const final = document.querySelector('#final')

let playerCanWin = false
htmlMaze.addEventListener('mousemove', event => {
    const elementClass = event.target.classList[0]
/*     if (elementClass == 'start') {
        playerCanWin = true
        htmlMaze.style = '--bg-color: green;'
        console.log('start')
    }else if (elementClass === 'wall') {
        playerCanWin = false
        htmlMaze.style = '--bg-color: red;'
    }else if (elementClass === 'final') {
        if (playerCanWin) {
            htmlMaze.innerHTML = 'You Win'
        }
    } */

    const elementsClassList = {
        start: () => {playerCanWin = true},
        wall: () => {playerCanWin = false},
        final: () => {
            if (playerCanWin) htmlMaze.innerHTML = 'You Win'
        }
    }
    if (elementsClassList[elementClass]) {
        elementsClassList[elementClass]()
    }
    
    if (playerCanWin) {
        htmlMaze.style = '--bg-color: green;'
    }else{
        htmlMaze.style = '--bg-color: red;'
    }

    htmlMaze.style = 
        playerCanWin ? '--bg-color: green' : '--bg-color: red'
})

htmlMaze.addEventListener('mouseleave', () => {
    playerCanWin = false
    htmlMaze.style = '--bg-color: red;'
})
