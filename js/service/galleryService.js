'use strict'

var gImgs = [
    {
        id: 1,
        url: 'img/meme(square)/1.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 2,
        url: 'img/meme(square)/2.jpg',
        keywords: ['cute', 'dog']
    },
    {
        id: 3,
        url: 'img/meme(square)/3.jpg',
        keywords: ['cute', 'dog']
    },
    {
        id: 4,
        url: 'img/meme(square)/4.jpg',
        keywords: ['cute', 'cat']
    },
    {
        id: 5,
        url: 'img/meme(square)/5.jpg',
        keywords: ['baby', 'cute']
    }
]

var filter = ''

function getImgs() {
    if (filter) {
        return gImgs.filter(img => img.keywords.find(keyword => keyword === filter))
    }
    return gImgs
}

function findImg(id) {
    return gImgs.find(img => img.id === id)
}

function filterGallery(filterBy) {
    if (!filterBy) return
    filter = filterBy
}

