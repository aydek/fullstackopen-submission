import React from 'react'
import personService from '../services/persons'


const Numbers = ({ persons, filter, setPersons, setNotification, setNotificationType }) => {

    const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    
    const deletePerson = (id, name) => () => {

        if(window.confirm(`Delete ${name}?`)) {
            personService.remove(id)
                .then(response => {
                    setPersons(persons.filter(person => id !== person.id));
                })
                .catch(error => {
                    setNotificationType('error')
                    setNotification(`Information of ${name} already has been removed from the server!`);
                    setPersons(persons.filter(person => id !== person.id));
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                })
        }
    }

    return result.map(person =>
        <div key={person.name}>
            <span>{person.name} {person.number}</span>
            <button onClick={deletePerson(person.id, person.name)}>delete</button>
        </div>
    )
}

export default Numbers