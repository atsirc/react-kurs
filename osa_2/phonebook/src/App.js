import React, {useState} from "react"
import Persons from "./components/Persons.js"
import Form from "./components/Form"
import Search from "./components/Search"

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch ] = useState('')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const fields = [
    {name: "name", value: newName},
    {name: "number", value: newNumber}
  ]

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.filter(n => n.name == newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        id: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleChange = (event) => {
    const value = event.target.value
    switch (event.target.name) {
      case "search": setSearch(value); break;
      case "name" : setNewName(value); break;
      case "number": setNewNumber(value); break;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onChange={handleChange} value={search}/>
      <h2>add new contact</h2>
      <Form onSubmit={addName} onChange={handleChange} fields={fields}/>
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) } />
    </div>
  )
}

export default App;