import React from 'react'
import Country from "./Country"

const Countries = ({ countries }) => {
  
  return (
    <ul>
        {countries.map(country => 
          <Country key={country.alpha3Code} country={country} single={false}/>
        )}
    </ul>
  )
}

export default Countries