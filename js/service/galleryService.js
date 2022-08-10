'use strict'

var gImgs = [
    {
        id: 1,
        url: 'img/meme(square)/1.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 2,
        url: 'img/meme(square)/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3,
        url: 'img/meme-imgs(square)/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4,
        url: 'img/meme-imgs(square)/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: 'img/meme-imgs(square)/5.jpg',
        keywords: ['funny', 'cat']
    }

]

function getImgs() {
    return gImgs
}

function findImg(id){
    console.log('id:', id)
    return gImgs.find(img => img.id === id)
}
