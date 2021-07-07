import React from 'react'

const Search = ({onChange, value }) => {
  return (
    <div>
        filter shown with <input name="search" onChange={onChange} value={value}/>
    </div>
    )
}

export default Search