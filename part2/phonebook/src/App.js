import { useState } from 'react'
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    if(!newName.length || !newNumber.length) return
    if(persons.find(value => value.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('')
      return;
    }
    setPersons([...persons, {name: newName, number: `${newNumber}`}]);
    setNewName('');
    setNewNumber('')
  }

  const setPersonName = (event) => setNewName(event.target.value);
  const setPersonNumber = (event) => setNewNumber(event.target.value);
  const setFiterValue = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={filter} onChange={setFiterValue} /></div>
      <h2>add a new</h2>
      <form onSubmit={submitForm}>
        <div>name: <input value={newName} onChange={setPersonName} /></div>
        <div>number: <input value={newNumber} onChange={setPersonNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App