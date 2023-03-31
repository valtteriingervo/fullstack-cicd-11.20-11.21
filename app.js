require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const personRouter = require('./controllers/persons')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('data',
  function (req,) {
    if (req.method === 'POST') {
      return JSON.stringify(req.body)
    }
    else {
      return ''
    }
  }
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use('/api/persons', personRouter)

// Use this endpoint if none of the app. paths work out
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app