import React, {useState} from 'react'
import Weather from "./Weather"

const Country = ({ country, single }) => {
  const [visibility, setVisibility] = useState(single ? true : false)

  const getContents = () => {
    if (visibility) {
      return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <p>languages</p>
          <ul className="list">
            {country.languages.map((language, i)=> <li key={i}>{language.name}</li>)}
          </ul>
          <img src={country.flag} width="200" alt="country flag"/>
          <Weather city={country.capital}/>
        </div>
      )
    } else 
      return country.name
  }
  
  if (single) {
    return getContents()
  }
  else {
    return (
      <li>
        {getContents()}
        <button onClick={() =>{setVisibility(!visibility)}}>{!visibility ? "show" : "hide"}</button>
      </li>
    )
  }
}

export default Country