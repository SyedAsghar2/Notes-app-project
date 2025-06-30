const fs = require('node:fs')
const path = require('node:path')
const util = require('node:util')
const $ = require('jquery')

$(document).ready(() => {
    $('newNoteBtn').addEventListener('click', () => {
        console.log('button clicked')
    })
})