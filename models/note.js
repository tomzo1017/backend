const mongoose = require('mongoose')


const url = 'metaet


mongoose.connect(url)



const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})



module.exports = Note
