const personRouter = require('express').Router()
const Person = require('../models/person')

// GET all persons
personRouter.get('/', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// Info page for people amount and time
personRouter.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const personsLength = persons.length
      const lengthMsg = `Phonebook has info for ${personsLength} people`
      const dateMsg = new Date()
      const htmlMsg =
        `<p>${lengthMsg}</p>
                 <p>${dateMsg}</p>`
      response.send(htmlMsg)
    })
    .catch(error => next(error))
})

// GET a CERTAIN person
personRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      }
      else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))
})

// Delete certain person
personRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// POST new person
personRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.name === undefined) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// PUT -> Change person information
personRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' },

  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personRouter