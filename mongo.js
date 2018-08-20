const mongoose = require('mongoose')



const url = 'mongodb://ggggsegesgsgs125322.mlab.com:25322/tommidatabase'

mongoose.connect(url, { useNewUrlParser: true })


const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})


const note = new Note({
    content: "HTML on helppoa",
    date: new Date,
    important: true
})


note
 .save() 
 .then(response => {
     console.log('note saved!')
     mongoose.connection.close()
 })