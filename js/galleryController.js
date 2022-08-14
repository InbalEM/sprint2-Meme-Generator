'use strict'

function initGallery() {
    restoreMemes()
    restoreSavedMemes()
    renderGallery()
}

function renderGallery() {
    const images = getImgs()
    const strHTMLs = images.map(img =>
        `
        <div class="img-container">
            <img class="img" onclick="onImgSelect('${img.url}',${img.id} )" src="img/meme(square)/${img.id}.jpg">
        </div>
        `
    )
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function onFlexibleMeme(ev) {
    ev.preventDefault()
    const imgCount = getImgs().length
    const imgId = getRandomInt(1, imgCount)
    addFlexibleMeme(imgId)
}

function onImgSelect(imgUrl, id) {
    // renderCanvasContent(`'${imgUrl}'`)
    initMeme(id)
    toggleGallery()
    toggleCanvas()
}

function toggleGallery() {
    document.querySelector('.gallery-container').classList.toggle('hide')
}

function onFilterGallery(elFilterBy) {
    filterGallery(elFilterBy.value)
    elFilterBy.value = ''
    renderGallery()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function onGalleryLink() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.saved-memes').classList.add('hide')
}

