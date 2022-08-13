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
    },
    {
        id: 6,
        url: 'img/meme(square)/6.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 7,
        url: 'img/meme(square)/7.jpg',
        keywords: ['funny']
    },
    {
        id: 8,
        url: 'img/meme(square)/8.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 9,
        url: 'img/meme(square)/9.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 10,
        url: 'img/meme(square)/10.jpg',
        keywords: ['funny']
    },
    {
        id: 11,
        url: 'img/meme(square)/11.jpg',
        keywords: ['movie']
    },
    {
        id: 12,
        url: 'img/meme(square)/12.jpg',
        keywords: ['funny']
    },
    {
        id: 13,
        url: 'img/meme(square)/13.jpg',
        keywords: ['funny', 'movie']
    },
    {
        id: 14,
        url: 'img/meme(square)/14.jpg',
        keywords: ['movie']
    },
    {
        id: 15,
        url: 'img/meme(square)/15.jpg',
        keywords: ['movie']
    },
    {
        id: 16,
        url: 'img/meme(square)/16.jpg',
        keywords: ['movie', 'baby']
    },
    {
        id: 17,
        url: 'img/meme(square)/17.jpg',
        keywords: ['movie']
    },
    {
        id: 18,
        url: 'img/meme(square)/18.jpg',
        keywords: ['funny', 'baby']
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

