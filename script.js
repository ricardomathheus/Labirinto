// labirinto
const htmlMaze = document.querySelector('#maze')

// cores
const colors = {
    canWin: 'blue',
    defeated: '#ff005c',
    bg: '#7171ef',
    text: 'white'
}//{canWin:'green' , defeated: 'red'}
document.querySelector('body').style.backgroundColor = colors.bg
document.querySelector('body').style.color = colors.text
htmlMaze.style = `--bg-color: ${colors.defeated};`

// gerar labirinto

function changeMap() {
    const urlParams = new URLSearchParams(window.location.search)
    const mazeParam = urlParams.get('maze')
    
    if (mazeParam) {
        console.log(mazeParam.replace(/%20/g, ' ').split(','))
        return mazeParam.replace(/%20/g, ' ').split(',')
    }

    const mazeMapAlt = [
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

    return mazeMapAlt
}

const map = changeMap()

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

function mouse() {
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
        start: () => { playerCanWin = true },
        wall: () => { playerCanWin = false },
        final: () => {
            if (playerCanWin) htmlMaze.innerHTML = 'You Win'
        }
    }
    if (elementsClassList[elementClass]) {
        elementsClassList[elementClass]()
    }

    htmlMaze.style =
        playerCanWin ? `--bg-color: ${colors.canWin}` : `--bg-color: ${colors.defeated}`
})

htmlMaze.addEventListener('mouseleave', () => {
    playerCanWin = false
    htmlMaze.style = `--bg-color: ${colors.defeated};`
})

}

//character

function character() {



    function NewCharacter() {
        const characterParent = document.querySelector('#player-conteiner')

        const character = {
            positionY: 0,
            positionX: 0,

            upDatePositionY: function(value) {
                this.positionY = value
                this.render()
            },
            upDatePositionX: function(value) {
                this.positionX = value
                this.render()
            },

            id: 'player',

            html: function() {
                return `
                <div 
                    id='player'
                    style=
                        'width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background-color: blue;
                        position: relative;
                        bottom: ${this.positionY}px;
                        right: ${this.positionX}px'
                >
                </div>
                `
            },    

            render: function() {characterParent.innerHTML = this.html()}
        }  

        return character
    }

    const player = NewCharacter()
    player.render()

    addEventListener('keydown', Keyboard => {
        const key = Keyboard.key

        console.log(key)

        const keyfunctions = {
            ArrowUp: () => {
                player.upDatePositionY(player.positionY + 5)
            },

            ArrowRight: () => {
                player.upDatePositionX(player.positionX - 5)
            },

            ArrowDown: () => {
                player.upDatePositionY(player.positionY - 5)
            },

            ArrowLeft: () => {
                player.upDatePositionX(player.positionX + 5)
            },
        }

        if (keyfunctions[key]) {
            keyfunctions[key]()
        }

    })
}

character()
