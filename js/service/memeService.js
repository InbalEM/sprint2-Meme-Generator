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

function setLineTxt(text, idx) {
    gMeme.lines[idx].txt = text
}

function setFillColor(color, idx) {
    gMeme.lines[idx].fillColor = color
}

function setStrokeColor(color, idx) {
    gMeme.lines[idx].strokeColor = color
}

function updateFontSize(incDecBy, idx) {
    gMeme.lines[idx].size += incDecBy
}

function addMeme(imgId, lines = ['', '']) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    lines.forEach(line =>
        gMeme.lines.push(
            {
                txt: line,
                size: 20,
                align: 'center',
                fillColor: 'blue',
                strokeColor: 'black',
            }
        )
    )

}

function saveMemesToStorage(link) {
    gSavedMemes.unshift(link)
    gMemes.unshift(gMeme)
    saveToStorage(STORAGE_KEY, gMemes)
    saveToStorage(STORAGE_KEY_MEME, gSavedMemes)
}

function restoreMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
}

function restoreSavedMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY_MEME)
    return gSavedMemes
}