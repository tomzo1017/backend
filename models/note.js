const mongoose = require('mongoose')


const url = 'mongodb://tomzo1017:Tomzo1121@ds125322.mlab.com:25322/tommidatabase'


mongoose.connect(url)



const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})



module.exports = Note