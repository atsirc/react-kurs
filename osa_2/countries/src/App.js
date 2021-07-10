import React, {useState, useEffect} from "react"
import axios from "axios"
import Country from "./components/Country.js"
import Countries from "./components/Countries"
import Search from "./components/Search"

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  const hook =() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=>{
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleChange = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  const performSearch = () => {
    if (search !== "") {
      const countriesFound = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
      if (countriesFound.length === 0) {
        return <p>No countries found for the search criteria</p>
      } else if (countriesFound.length === 1) {
        return <Country country={countriesFound[0]} single={true}/>
      } else if (countriesFound.length > 10) {
        return <p>Too many matches, specify another filter</p>
      } else {
        return <Countries countries={countriesFound}/>
      }
    }
  }

  return (
    <div>
      <h2>Countries</h2>
      <Search onChange={handleChange} value={search}/>
      {performSearch()}
    </div>
  )
}

export default App;