import React, {useState, useEffect} from "react"
import services from "./services/phonebook"
import Persons from "./components/Persons.js"
import Form from "./components/Form"
import Search from "./components/Search"
import Notification from "./components/Notification"

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ message, setMessage] = useState(null)
  const fields = [
    {name: "name", value: newName},
    {name: "number", value: newNumber}
  ]
  const hook =() => {
    services.getAll().then(setPersons)
	}

	useEffect(hook, [])

  const handleAddNumber = (personObj) => {
    const existingPerson = persons.find(person => person.name === newName)
    console.log("persons", persons)
    console.log("new",personObj)
    if (typeof(existingPerson) !== 'undefined') {
      if (window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)) {
        return services.update(existingPerson.id, personObj).then( changedNumber => {
            setPersons( persons.map( person =>
              person.id !== existingPerson.id ? person : changedNumber))
            setMessage( {
              text: `${changedNumber.name}'s number was changed`,
              type: "success"}
            )
            setTimeout(() => { setMessage(null)}, 5000)
          }
        ).catch(error =>{
          setMessage( {
            text: `${personObj.name} was already deleted from the phonebook`,
            type: "error"}
          )
          setTimeout(() => { setMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
      }
    } else {
      return services.create(personObj).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setMessage( {
          text: `${addedPerson.name} was added to the phonebook`,
          type: "success"}
        )
        setTimeout(() => { setMessage(null)}, 5000)
      })
    }
  }

  const addNumber = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    handleAddNumber(personObj).then(response => {
      setNewName("")
      setNewNumber("")
    }).catch(console.log)
  }

  const deleteNumber = (name, id) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      services.deleteNumber(id).then( deletedNumber => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage( {
          text: `${name} was deleted from the phonebook`,
          type: "success"}
        )
        setTimeout(() => { setMessage(null)}, 5000)
      })
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    switch (event.target.name) {
      case "search": setSearch(value); break;
      case "name" : setNewName(value); break;
      case "number": setNewNumber(value); break;
      default: console.log('something went wrong')
    }
  }
  const performSearch = () => {
    return persons.filter(person =>
        person.name.toLowerCase()
        .includes(search.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <Notification message={message.text} type={message.type} /> : <></>}
      <Search onChange={handleChange} value={search}/>
      <h2>add new contact</h2>
      <Form onSubmit={addNumber} onChange={handleChange} fields={fields}/>
      <h2>Numbers {search.length > 0 ? `filtered by ${search}` : ""}</h2>
      <Persons persons={performSearch()} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App;