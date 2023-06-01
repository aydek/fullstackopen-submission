import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Notification from './components/Notification';
import Numbers from './components/Numbers';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('error');

  useEffect(() => {
    personService.getAll()
      .then(response => setPersons(response))
   
  }, [])
  

  const submitForm = (event) => {
    event.preventDefault();
    if(!newName.length || !newNumber.length) return
    const currentPerson = persons.find(person => person.name === newName);
   
    if(currentPerson) {
      if(currentPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...currentPerson, number: newNumber}
        personService.update(currentPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : response));
            setNotificationType('info');
            setNotification(`${response.name} number has been changed to ${response.number}`);
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          .catch(error => {
            setNotificationType('error')
            setNotification(`Information of ${newName} already has been removed from the server!`);
            setTimeout(() => {
                setNotification(null);
            }, 5000);
          })
      }
      return;
    }
    const newObject = {
      name: newName,
      number: newNumber
    }
    
    personService.create(newObject)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
        setNotificationType('info');
        setNotification(`Added ${response.name}`);
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }

  const setPersonName = (event) => setNewName(event.target.value);
  const setPersonNumber = (event) => setNewNumber(event.target.value);
  const setFilterValue = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} setFilterValue={setFilterValue}/>
      <h3>Add a new</h3>
      <PersonForm submitForm={submitForm} newName={newName} setPersonName={setPersonName} newNumber={newNumber} setPersonNumber={setPersonNumber}/>
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} setPersons={setPersons} setNotification={setNotification} setNotificationType={setNotificationType} />
    </div>
  )
}

export default App