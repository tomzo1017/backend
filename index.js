const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')


/*

const formatNote = (note) => {
    const formattedNote = {...note._doc, id: note._id}
    delete formattedNote._id
    delete formattedNote.__v    
    return formattedNote
}

*/

const formatNote = (note) => {
    return {
      content: note.content,
      date: note.date,
      important: note.important,
      id: note._id
    }
  }
  
app.use(express.static('build'))

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

morgan.token('type', function (req, res) { return req.headers['content-type'] })

let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    },

  ]
  const generateId = () => {
  const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
  }
  

  const logger = (req, res, next) => {
      console.log('Method:', req.method)
      console.log('Path: ', req.path)
      console.log('Body: ', req.body)
      console.log('----')
      next()
    
  }

  app.use(logger)

  app.post('/api/notes', (req,res) => {
        const body = req.body

        if (body.content === undefined) {
            return res.status(400).json({error: 'content missing'})
        }

       const note = new Note({
           content: body.content,
           important: body.important || false,
           date: new Date()
       })

       note
            .save()
            .then(savedNote => {
                res.json(formatNote(savedNote))
            })
  })


  app.get('/api/notes', (req,res) => {
   Note
    .find({})
    .then(notes => {
        res.json(notes.map(formatNote(note)))
    })
  })

  app.get('/api/notes/:id', (req,res) => {
     Note
     .findById(request.params.id)
     .then(note => {
         response.json(formatNote(note))
     })
  })

  app.delete('/api/notes/:id', (req,res) => {
      const id = Number (req.params.id)
      notes = notes.filter(note => note.id !== id)

      res.status(204).end()
  })


    const error = (req, res) => {
        res.status(404).send({error: 'unknown endpoint'})
    }

    app.use(error)


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

