require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny', {
  skip: (req) => req.method === 'POST'
}))

app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens.res(req, res, 'content-length')} ${JSON.stringify(req.body)}`
  }
}, {
  skip: (req) => req.method !== 'POST'
}))

app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    return response.status(400).json({ error: 'name/number missing'})
  }

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
    console.log(`added ${name} number ${number} to phonebook`)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end();
    };
});

app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
})

app.get('/info', (_request, response) => {
    const info = `Phonebook has info for ${persons.length} people <br> ${new Date()}`
    response.send(info)
});


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});