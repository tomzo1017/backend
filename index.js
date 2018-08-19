const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

  app.post('/notes', (req,res) => {
        const body = req.body

        if (body.content === undefined) {
            return res.status(400).json({error: 'content missing'})
        }

        const note = {
            content: body.content,
            important: body.important || false,
            date: new Date(),
            id: generateId()
        }

        notes = notes.concat(note)
        res.json(note)
  })
  app.get('/', (req,res) => {
      res.send('<h1>Hello World </h1>')
  })

  app.get('/notes', (req,res) => {
      res.json(notes)
      const logger = req.logger
  })

  app.get('/notes/:id', (req,res) => {
      const id =  Number (req.params.id)
      console.log(id)
      const note = notes.find(note => note.id === id)
      console.log(note)
      if (note) {
          res.json(note)
      } else {
          res.status(404).end()
      }
  })

  app.delete('/notes/:id', (req,res) => {
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

