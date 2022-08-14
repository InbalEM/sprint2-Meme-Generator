'use strict'

const STORAGE_KEY = 'memeDB'
const STORAGE_KEY_MEME = 'savedMemesDb'

var gMemes = []
var gMeme

var gSavedMemes = []

function getMeme() {
    return gMeme
}

function getMemeById(id) {
    gMeme = gMemes[id]
    return gMeme
}

function getMemes() {
    return gMemes
}

function setLineTxtIdx(text, idx) {
    gMeme.lines[idx].txt = text
}

function setLineTxt(text, line) {
    line.txt = text
}

function setFillColorIdx(color, idx) {
    gMeme.lines[idx].fillColor = color
}

function setFillColor(color, line) {
    line.fillColor = color
}

function setStrokeColorIdx(color, idx) {
    gMeme.lines[idx].strokeColor = color
}

function setStrokeColor(color, line) {
    line.strokeColor = color
}

// function updateFontSize(incDecBy, idx) {
//     gMeme.lines[idx].size += incDecBy
// }

function updateFontSize(incDecBy, line) {
    line.size += incDecBy
}

function alignTextChange(align, line) {
    line.align = align
    memePos(gMeme)
}

function addMeme(imgId, lines = ['top line', 'bottom line']) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [],
        stickers: []
    }
    lines.forEach(line =>
        gMeme.lines.push(
            {
                txt: line,
                size: 20,
                align: 'center',
                fillColor: '#0000ff',
                strokeColor: 'black',
                pos: {},
                isDrag: false
            }
        )
    )
    return gMeme
}

function addLine(){
        gMeme.lines.push(
            {
                txt: '',
                size: 20,
                align: 'center',
                fillColor: '#0000ff',
                strokeColor: 'black',
                pos: {},
                isDrag: false
            }
        )
}

function setPos(line, x, y) {
    line.pos.x = x
    line.pos.y = y
}

function addStickerPosToMeme(pos, stickerId) {
    gMeme.stickers.push({
        pos: pos,
        stickerId: stickerId,
        isDrag: false
    })
}

function saveMemesToStorage(link) {
    gSavedMemes.push(link)
    gMemes.push(gMeme)

    saveToStorage(STORAGE_KEY, gMemes)
    saveToStorage(STORAGE_KEY_MEME, gSavedMemes)
}

function restoreMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
    if (!gMemes) gMemes = []
}

function restoreSavedMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY_MEME)
    if (!gSavedMemes) gSavedMemes = []
    return gSavedMemes
}

function isLineClicked(clickedPos) {
    var lines = gMeme.lines
    const line = lines.find((line) => {
        var linePos = line.pos

        if (line.align === 'left') {
            return (clickedPos.x >= linePos.x && clickedPos.x <= linePos.x + line.width
                && clickedPos.y >= linePos.y - line.height && clickedPos.y <= linePos.y)
        }
        if (line.align === 'center') {
            return (clickedPos.x <= linePos.x + line.width / 2 && clickedPos.x >= linePos.x - line.width / 2
                && clickedPos.y <= linePos.y + line.height / 2 && clickedPos.y >= linePos.y - line.height / 2)
        }
        if (line.align === 'right') {
            return (clickedPos.x <= linePos.x && clickedPos.x >= linePos.x - line.width
                && clickedPos.y >= linePos.y - line.height && clickedPos.y >= linePos.y)
        }
    })
    if (line) {
        return line
    }
    return false
}

function isStickerClicked(clickedPos) {
    const stickers = gMeme.stickers
    const sticker = stickers.find(sticker => {
        var stickerPos = sticker.pos
        return (clickedPos.x >= stickerPos.x && clickedPos.x <= stickerPos.x + 50
            && clickedPos.y >= stickerPos.y - 50 && clickedPos.y >= stickerPos.y)
    })
    if (sticker) {
        return sticker
    }
    return false
}

function setDragLine(isDrag, line) {
    if (!line) return
    line.isDrag = isDrag
}

function setDragSticker(isDrag, sticker) {
    if (!sticker) return
    console.log('sticker:', sticker)
    sticker.isDrag = isDrag
}

function moveLine(line, dx, dy) {
    line.pos.x = dx
    line.pos.y = dy
}

function moveSticker(sticker, dx, dy) {
    sticker.pos.x = dx
    sticker.pos.y = dy
}

function memePos(meme) {
    if (!meme.lines[0].txt) return
    let lines = meme.lines
    lines.map((line, idx) => {
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
        setPos(line, x, y)
    })
}