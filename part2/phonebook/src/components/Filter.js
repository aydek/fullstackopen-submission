import React from 'react'

const Filter = ({filter, setFilterValue}) => {
  return (
    <div>filter shown with<input value={filter} onChange={setFilterValue} /></div>
  )
}

export default Filter