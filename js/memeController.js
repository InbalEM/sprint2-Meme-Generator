'use strict'

var gElCanvas
var gCtx

var rowIdx = 0

function initMeme(imgId) {
    addMeme(imgId)
    renderMeme()
    // addListenersMeme()

}

function renderMeme() {
    const meme = getMeme()
    console.log('renderMeme : meme:', meme)
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // resizeCanvas()
    // drawTexts()
    drawTexts(meme)

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function drawText(line, x, y) {
    console.log(' drawText   line , x,y:', line , x,y)
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.lineWidth = 1;
    gCtx.font = `${line.size}px Impact`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(line.txt, x, y);
    gCtx.closePath()
}

function drawTexts(meme) {
    console.log('drawTexts:', meme)
    let lines = meme.lines
    lines.forEach((line, idx) => {
        if (line.align === 'left') {
            var x = 0 + line.size
        } else if (line.align === 'right') {
            var x = gElCanvas.width - line.size
        } else if (line.align === 'center') {
            var x = gElCanvas.width / 2
        }
        if (idx === 0) {
            var y = gElCanvas.height - (gElCanvas.height - line.size)
        } else if (idx === 1) {
            var y = gElCanvas.height - line.size
        } else {
            var y = gElCanvas.height / 2
        }
        // var textDimensions = gCtx.measureText(line.txt)
        // if (gElCanvas.width - textDimensions.width <= 100) {
        //     splitToRows(line)
        // }
console.log('drawTexts - line , x,y:', line , x,y)
        drawText(line, x, y)
    })
}

function onchangeTxt(txt) {
    setLineTxt(txt, rowIdx)
    renderMeme()
}

function addListenersMeme() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        renderCanvas()
    })
}


function setImg(image) {
    var img = new Image()
    img.src = image
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }

}

function toggleCanvas() {
    document.querySelector('.editor').classList.toggle('hide')
}

function switchTexts(){
    if (rowIdx === 0 )rowIdx = 1
    else rowIdx = 0
}