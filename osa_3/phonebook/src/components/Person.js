import React from 'react'

const Person = ({ person, delFunction }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={()=> delFunction(person.name, person.id)}>Delete</button>  
    </li>
  )
}

export default Person