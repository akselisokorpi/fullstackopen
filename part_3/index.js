const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3001

var morgan = require('morgan')

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

let persons = [
  {
    id: "1", 
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

const generateId = () => String(Math.floor(Math.random() * 1000));
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
});

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
  response.json(persons)
});

app.get('/info', (_request, response) => {
    const info = `Phonebook has info for ${persons.length} people <br> ${new Date()}`
    response.send(info)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});