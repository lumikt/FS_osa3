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

    response.send(`<p>Phonebook has ${persons.length} numbers</p><br></br><p>Request made at ${time} GMT+0200 (EEST).</p>`,)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })