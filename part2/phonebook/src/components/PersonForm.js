import React from 'react'

const PersonForm = ({submitForm, newName, setPersonName, newNumber, setPersonNumber}) => {
  return (
    <div>
        <form onSubmit={submitForm}>
            <div>name: <input value={newName} onChange={setPersonName} /></div>
            <div>number: <input value={newNumber} onChange={setPersonNumber}/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm