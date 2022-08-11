'use strict'

var gImgs = [
    {
        id: 1,
        url: 'img/meme(square)/1.jpg',
        keywords: ['1', 'cat']
    },
    {
        id: 2,
        url: 'img/meme(square)/2.jpg',
        keywords: ['2', 'cat']
    },
    {
        id: 3,
        url: 'img/meme(square)/3.jpg',
        keywords: ['3', 'cat']
    },
    {
        id: 4,
        url: 'img/meme(square)/4.jpg',
        keywords: ['4', 'cat']
    },
    {
        id: 5,
        url: 'img/meme(square)/5.jpg',
        keywords: ['5', 'cat']
    }

]

function getImgs() {
    return gImgs
}

function findImg(id) {
    return gImgs.find(img => img.id === id)

}
