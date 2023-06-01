import React from 'react'

const FilteredResult = ({ persons, filter }) => {
    const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    
    return result.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    
}

const Numbers = ({ persons, filter }) => {

    return (
        <div>
            {filter.length ? <FilteredResult persons={persons} filter={filter} /> : persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default Numbers