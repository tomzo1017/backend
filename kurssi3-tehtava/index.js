const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())
app.use(bodyParser.json())

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),

      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))
let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
    
    },
    {
        id: 2,
        name: "Martti Teinari",
        number: "040-123456",
       
      },
      {
        id: 3,
        name: "Arto Järvinen",
        number: "040-123456",
       
      },
      {
        id: 4,
        name: "Lea Kutvonen",
        number: "040-123456",
     
      },

  ]

  
  const generateId = () => {
      const id = Math.floor((Math.random() * 30)  + 6)
      return id
  }
  
  
  
app.post('/api/persons', (req,res) => {
            const seen = new Set();

    const hasDuplicates = persons.some(function(currentObject) {
        return seen.size === seen.add(currentObject.name).size;
      })
     
        const body = req.body
      
        if (body.name === undefined) {
            return res.status(400).json({error: 'name undefined'})
        } else if (body.number === undefined){
            return res.status(400).json({error: 'number undefined'})
        } else if (hasDuplicates){
            return res.status(400).json({error: "name already exists in persons"})
        } else {

        const person = { 
            name: body.name,
            number: body.number,
            id: generateId()
        }

        persons = persons.concat(person)

        res.json(person)
    }
})
  app.get('/', (req,res) => {
      res.send('<h1>Hello World </h1>')
  })
  app.get('/info', (req,res) => {

      res.send(`puhelinluettelossa on ${persons.length} numeroa`)
  })

  app.get('/api/persons', (req,res) => {
      res.json(persons)
  })

  app.get('/api/persons/:id', (req,res) => {
      const id =  Number (req.params.id)
      console.log(id)
      const person = persons.find(person => person.id === id)
      console.log(person)
      if (person) {
          res.json(person)
      } else {
          res.status(404).end()
      }
  })

app.delete('/api/persons/:id', (req,res) => {
    const id = Number (req.params.id)
     persons = persons.filter(person => person.id !== id) 

        res.status(204).end()  
})


  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

