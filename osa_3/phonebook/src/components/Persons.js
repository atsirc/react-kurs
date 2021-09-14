import React from 'react'
import Person from "./Person"

const Persons = ({ persons, deleteNumber }) => {
  return (
    <ul>
        {persons.map(person => <Person key={person.id} person={person} delFunction={deleteNumber}/> )}
    </ul>
  )
}

export default Persons