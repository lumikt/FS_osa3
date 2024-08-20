const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id:"1",
        name:"Arto Hellas",
        number:"040-123456"
    },
    {
        id:"2",
        name:"Ada Lovelace",
        number:"39-44-5323523"
    },
    {
        id:"3",
        name:"Dan Abramov",
        number:"12-43-234345"
    },
    {
        id:"4",
        name:"Mary Poppendieck",
        number:"39-23-6423122"
    },

]
const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) => {

    const time = new Date().toLocaleString('en-GB', {timeZone:'EET'})
    console.log(time)

    response.send(`<p>Phonebook has ${persons.length} numbers</p><br><p>Request made at ${time} GMT+0200 (EEST).</p>`,)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(note => note.id === id)
    
    if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 9999))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number)   {
      return response.status(400).json({ 
        error: 'Missing name or number' 
      })
    }
    
    const existingName = persons.find((person) => person.name === body.name)

    if (existingName) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})