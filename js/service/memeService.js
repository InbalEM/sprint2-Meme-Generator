'use strict'


var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'red'
        },
        {
            txt: `line 1\nline 2 \nthird line..`,
            size: 20,
            align: 'center',
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text, idx) {
    gMeme.lines[idx].txt = text
}

function setColor(color, idx) {
    gMeme.lines[idx].color = color
}

function updateFontSize(incDecBy, idx){
    gMeme.lines[idx].size += incDecBy
}

function addMeme(imgId, lines = ['top line', 'bottom line']) {
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
                color: 'black'
            }
        )
    )
}