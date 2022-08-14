'use strict'

var gElCanvas
var gCtx

var growIdx = 0

var gIsAddSticker = false
var gStickerId

var gStartPos
var gLineDrag
var gStickerDrag

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initMeme(imgId = 2) {
    const meme = addMeme(imgId)
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    memePos(meme)
    renderMeme()
    showLineInput()
    addListenersMeme()
}

function renderMeme() {
    const meme = getMeme()

    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');

    const image = findImg(meme.selectedImgId)
    const url = image.url
    renderCanvasContent(url, meme)
    doAddSticker(meme)
}

function addFlexibleMeme(imgId) {
    let linesCount = getRandomInt(0, 2)
    var meme = addMeme(imgId)
    while (linesCount >= 0) {
        gLineDrag = meme.lines[linesCount]
        let lineTxt = getRandomWord(length = 15)
        setLineTxt(lineTxt, gLineDrag)
        const fillColor = getRandomColor()
        setFillColor(fillColor, gLineDrag)
        const strokeColor = getRandomColor()
        setStrokeColor(strokeColor, gLineDrag)
        linesCount--
    }
    toggleGallery()
    toggleCanvas()
    // const meme = addMeme(imgId)
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListenersMeme()
    memePos(meme)
    renderMeme()
}

// function addFlexibleMeme(imgId) {
//     let linesCount = getRandomInt(1, 3)
//     addMeme(imgId)
//     while (linesCount > 0) {
//         let line = getRandomWord(length = 15)
//         console.log('line:', line)
//         setLineTxtIdx(line, linesCount - 1)
//         const fillColor = getRandomColor()
//         setFillColorIdx(fillColor, linesCount - 1)
//         const strokeColor = getRandomColor()
//         setStrokeColorIdx(strokeColor, linesCount - 1)
//         linesCount--
//     }
//     toggleGallery()
//     toggleCanvas()
//     const meme = addMeme(imgId)
//     gElCanvas = document.querySelector('#my-canvas');
//     gCtx = gElCanvas.getContext('2d');
//     addListenersMeme()
//     memePos(meme)
//     renderMeme()
// }

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawTexts(meme) {
    meme.lines.map(line => {
        gCtx.beginPath()
        gCtx.textAlign = line.align;
        gCtx.lineWidth = 1;
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeStyle = line.strokeColor
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
        gCtx.closePath()
        if (line.txt) {
            getTextSize(line)
        }
    })
}

function getTextSize(line) {
    line.width = gCtx.measureText(line.txt).width
    line.height = parseInt(gCtx.font)
}

function onAddLine(ev){
    ev.preventDefault()
    const text = document.querySelector('[name="meme-text"]').value
    console.log('text:', text)


}

function addListenersMeme() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('click', onStickerPos)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    ev.preventDefault()
    gLineDrag = ''
    gStickerDrag = ''
    const pos = getEvPos(ev)
    const lineDrag = isLineClicked(pos)
    const stickerDrag = isStickerClicked(pos)
    if (!lineDrag && !stickerDrag) return
    // console.log('lineDrag:', lineDrag)
    if (lineDrag) {
        setDragLine(true, lineDrag)
        gStartPos = pos
        gLineDrag = lineDrag

        switchTextsOnDrag(lineDrag)
        onchangeFillColor(lineDrag.fillColor)
        onchangeStrokeColor(lineDrag.fillColor)
    }
    if (stickerDrag) {
        setDragSticker(true, stickerDrag)
        gStartPos = pos
        gStickerDrag = stickerDrag
    }
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gStartPos) return
    const pos = getEvPos(ev)
    if (gLineDrag) {
        moveLine(gLineDrag, pos.x, pos.y)
    }
    if (gStickerDrag) {
        console.log('gStickerDrag:', gStickerDrag)
        moveSticker(gStickerDrag, pos.x, pos.y)
    }
    renderMeme()
}

function onUp() {
    setDragLine(false, gLineDrag)
    setDragSticker(false, gStickerDrag)
    gStartPos = ''
    document.body.style.cursor = 'grab'
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

function switchTextsOnDrag(lineDrag) {
    const elTextInput = document.querySelector('[name="meme-text"]')
    elTextInput.value = lineDrag.txt
}

function showLineInput() {
    const elTextInput = document.querySelector('[name="meme-text"]')
    const meme = getMeme()
    const line = meme.lines[growIdx].txt
    elTextInput.value = line
}

// function onchangeTxt(elText) {
//     setLineTxt(elText.value, growIdx)
//     renderMeme()
// }

function onchangeTxt(elText) {
    setLineTxt(elText.value, gLineDrag)
    renderMeme()
}

// function onchangeFillColor(color) {
//     setFillColor(color, growIdx)
//     renderMeme()
// }

function onchangeFillColor(color) {
    const elFillColor = document.querySelector('[name="fillColor"]')
    elFillColor.value = color
    setFillColor(color, gLineDrag)
    renderMeme()
}

// function onchangeStrokeColor(color) {
//     const elFillColor = document.querySelector('[name="strokeColor"]')
//     elFillColor.value = color
//     setStrokeColor(color, growIdx)
//     renderMeme()
// }

function onchangeStrokeColor(color) {
    const elFillColor = document.querySelector('[name="strokeColor"]')
    elFillColor.value = color
    setStrokeColor(color, gLineDrag)
    renderMeme()
}


function onIncrease(ev) {
    ev.preventDefault()
    updateFontSize(5, gLineDrag)
    renderMeme()
}

function onDecrease(ev) {
    ev.preventDefault()
    updateFontSize(-5, gLineDrag)
    renderMeme()
}

function onAlignText(ev, textChange) {
    ev.preventDefault()
    alignTextChange(textChange, gLineDrag)
    renderMeme()
}

function onSaveMeme() {
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

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onAddSticker(stickerId) {
    gIsAddSticker = true
    gStickerId = stickerId
}

function onStickerPos(ev) {
    ev.preventDefault()
    if (!gStickerId) return
    var pos = getEvPos(ev)
    addStickerPosToMeme(pos, gStickerId)
    gStickerId = ''
    renderMeme()
}

function doAddSticker(meme) {
    let memeStickers = meme.stickers
    memeStickers.map(memeSticker => {
        var sticker = new Image()
        sticker.src = `img/stikers/${memeSticker.stickerId}.png`
        sticker.onload = () => {
            gCtx.drawImage(sticker, memeSticker.pos.x, memeSticker.pos.y)
        }
    })
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        var pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}


