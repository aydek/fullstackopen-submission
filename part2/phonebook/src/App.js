import { useState } from 'react'
import Filter from './components/Filter';
import Numbers from './components/Numbers';
import PersonForm from './components/PersonForm';

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
  const setFilterValue = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilterValue={setFilterValue}/>
      <h3>Add a new</h3>
      <PersonForm submitForm={submitForm} newName={newName} setPersonName={setPersonName} newNumber={newNumber} setPersonNumber={setPersonNumber}/>
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App