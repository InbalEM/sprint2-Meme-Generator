'use strict'

function initGallery(){
    renderGallery()
    // addListeners()
}

function renderGallery() {
    const images = getImgs()
    // console.log('images:', images)
    const strHTMLs =images.map(img => 
        `
        <div class="img-container">
            <img class="img" onclick="onImgSelect(this.src,${img.id} )" src="img/meme(square)/${img.id}.jpg">
        </div>
        `
        // console.log('img.url:', img.url)
        )
        document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(img, imgId){
    setImg(img)
    // initMeme(imgId)
    toggleGallery()
    toggleCanvas()
}

function toggleGallery(){
    document.querySelector('.gallery').classList.toggle('hide')  
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('click', onImgSelect)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onImgSelect)
}

