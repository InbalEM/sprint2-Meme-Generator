'use strict'

var gElCanvas
var gCtx

var growIdx = 0

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initMeme(imgId = 2) {
    addMeme(imgId)
    renderMeme()
    showLineInput()
}

function renderMeme() {
    const meme = getMeme()
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');

    var image = findImg(meme.selectedImgId)
    var url = image.url

    renderCanvasContent(url, meme)
}

function addFlexibleMeme(imgId) {
    let linesCount = getRandomInt(1, 3)
    addMeme(imgId)
    while (linesCount > 0) {
        let line = getRandomWord(length = 15)
        setLineTxt(line, linesCount - 1)
        const fillColor = getRandomColor()
        setFillColor(fillColor, linesCount - 1)
        const strokeColor = getRandomColor()
        setStrokeColor(strokeColor, linesCount - 1)
        linesCount--
    }
    toggleGallery()
    toggleCanvas()
    renderMeme()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawText(line, x, y) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.lineWidth = 1;
    gCtx.font = `${line.size}px Impact`
    gCtx.fillStyle = line.fillColor
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeStyle = line.strokeColor
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
        meme.pos = {x,y}
        console.log('meme:', meme)
        console.log('getMeme():',getMeme() )
        drawText(line, x, y)
    })
}

function addListenersMeme() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev){
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
}

function renderCanvasContent(image) {
    var img = new Image()
    img.src = image
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
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

function onchangeFillColor(color) {
    setFillColor(color, growIdx)
    renderMeme()
}

function onchangeStrokeColor(color) {
    setStrokeColor(color, growIdx)
    renderMeme()
}

function onchangeFillColor(color) {
    setFillColor(color, growIdx)
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

function onSaveMeme(ev, elLink) {
    const data = gElCanvas.toDataURL('image.png')
    saveMemesToStorage(data)
}


function onMemesLink() {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor').classList.add('hide')
    toggleSavedMemes()
    memeGallery()
}

function toggleSavedMemes() {
    document.querySelector('.saved-memes').classList.toggle('hide')
}

function memeGallery() {
    const memes = restoreSavedMemes()
    const strHTMLs = memes.map((meme, idx) =>
        `
        <div class="img-container">
            <img onclick="onMemeSelect(${idx})" src="${meme}">
        </div>
        `
    )
    document.querySelector('.saved-memes').innerHTML = strHTMLs
}

function onMemeSelect(id) {
    getMemeById(id)
    toggleSavedMemes()
    toggleCanvas()
    renderMeme()
}


