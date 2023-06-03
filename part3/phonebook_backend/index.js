const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config()
const Person = require('./models/person')



app.use(express.json());
app.use(cors());
app.use(express.static('build'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
});
  
app.use(morgan(':method :url :body'))

const PORT = process.env.PORT || 3001

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) response.json(person)
        else response.status(404).end()
    }).catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(person => {
        response.status(204).end();
    }).catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
  
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'Content missing' 
        });
    }

    Person.find({name: body.name})
        .then(person => {
            if(person.length > 0) return response.status(404).json({
                error: `name must be unique`
            });
            const newPerson = new Person({
                name: body.name,
                number: body.number
            });
        
            newPerson.save()
            .then(savedPerson => {
                response.json(savedPerson)
            })
            .catch(error => next(error));
        })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

const errorHandler = (error, request, response, next) => {
    console.error(error.name + ': ' + error.message);
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)