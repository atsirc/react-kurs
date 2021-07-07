import React from 'react'

const Form = ({onSubmit, onChange, fields}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
            { fields.map(field => <p>{field.name}: <input name={field.name} onChange={onChange} value={field.value}/></p>)}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form