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
console.log('MazeMap:', mazeMap)

const mazeRow = mazeMap.map(elementArray => {
    let row = ''
    elementArray.forEach(element => {
        if (element === 'W') {
            row += '<div class="wall"></div>'
        }else if(element === ' '){
            row += '<div class="way"></div>'
        }else if(element === 'S'){
            row += '<div class="start" id="start">Start</div>'
        }else if(element === 'F'){
            row += '<div class="final" id="final">End</div>'
        }else{
            console.log('algo deu errado')
        }
    })

    console.log('oi',`<div class="mazeRow">${row}<div>`)
    return `<div class="mazeRow">${row}<div>`
})

console.log('mazeRow', mazeRow)

mazeRow.forEach(element => {
    htmlMaze.innerHTML += element
})

// mecanicas do labirinto
const start = document.querySelector('#start')
const final = document.querySelector('#final')

let playerCanWin = true
htmlMaze.addEventListener('mousemove', event => {
    const elementClass = event.target.classList[0]
    console.log(elementClass)
    if (elementClass == 'start') {
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
    }
})

htmlMaze.addEventListener('mouseleave', () => {
    playerCanWin = false
    htmlMaze.style = '--bg-color: red;'
})
