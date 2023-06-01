import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '8888-2312320' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('')

  const submitForm = (event) => {
    event.preventDefault();
    if(!newName.length || !newPhone.length) return
    if(persons.find(value => value.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewPhone('')
      return;
    }
    setPersons([...persons, {name: newName, phone: `${newPhone}`}]);
    setNewName('');
    setNewPhone('')
  }

  const setPersonName = (event) => setNewName(event.target.value);
  const setPersonPhone = (event) => setNewPhone(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitForm}>
        <div>name: <input value={newName} onChange={setPersonName} /></div>
        <div>number: <input value={newPhone} onChange={setPersonPhone}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}
    </div>
  )
}

export default App