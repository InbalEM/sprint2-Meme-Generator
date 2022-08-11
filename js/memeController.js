'use strict'

var gElCanvas
var gCtx

var growIdx = 0

function initMeme(imgId = 2) {
    addMeme(imgId)
    renderMeme()
    // addListenersMeme()
    showLineInput()
}

function renderMeme() {
    const meme = getMeme()
    // const strHTMLs =
    //     `
    //         <canvas id="my-canvas" height="450" width="450"></canvas>
    //     `
    // document.querySelector('.canvas-container').innerHTML = strHTMLs

    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');

    var image = findImg(meme.selectedImgId)
    var url = image.url
    
    renderCanvasContent(url)
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawText(line, x, y) {
    gCtx.beginPath()
    // gCtx.linejoin = 'round'
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
        drawText(line, x, y)
    })
}

function addListenersMeme() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        renderCanvas()
    })
}

function renderCanvasContent(image) {
    var img = new Image()
    img.src = image
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // gCtx.drawImage(img, 0, 0)
        const meme = getMeme()
        drawTexts(meme)
    }
}

function toggleCanvas() {
    document.querySelector('.editor').classList.toggle('hide')
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function switchTexts(ev) {
    ev.preventDefault()
    if (growIdx === 0) growIdx = 1
    else growIdx = 0
    showLineInput()
}

function showLineInput() {
    const elTextInput = document.querySelector('[name="meme-text"]')
    const meme = getMeme()
    const line = meme.lines[growIdx].txt
    elTextInput.value = line
}

function onchangeTxt(elText) {
    setLineTxt(elText.value, growIdx)
    renderMeme()
}

function onchangeColor(color) {
    setColor(color, growIdx)
    renderMeme()
}

function onIncrease(ev) {
    ev.preventDefault()
    updateFontSize(5, growIdx)
    renderMeme()
}

function onDecrease(ev) {
    ev.preventDefault()
    updateFontSize(-5, growIdx)
    renderMeme()
}