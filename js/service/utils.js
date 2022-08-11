'use strict'

function getRandomInt(min, max) {
  var min = Math.ceil(min)
  var max = Math.floor(max)
  var randNum = Math.floor(Math.random() * (max - min)) + min
  return randNum
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomWord(length = 15) {
  let str = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  for (var i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return str;
}

