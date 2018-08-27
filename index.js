const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)


/*

const formatNote = (note) => {
    const formattedNote = {...note._doc, id: note._id}
    delete formattedNote._id
    delete formattedNote.__v    
    return formattedNote
}

*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => {
      console.log('connected to database', process.env.MONGODB_URI)
    })
    .catch( err => {
      console.log(err)
    })
  
  app.use(cors())
  app.use(bodyParser.json())
  app.use(express.static('build'))
  app.use(middleware.logger)
  
  app.use('/api/notes', notesRouter)
  
  app.use(middleware.error)
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })