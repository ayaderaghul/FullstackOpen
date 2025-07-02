import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newSearch, handleSearchChange}) => { 
  return (
    <p>filter shown with 
        <input value={ newSearch}
        onChange={ handleSearchChange} /></p>
  )
}

const PersonForm =({addName, newName, handleNameChange, newNumber, handleNumberChange }) => { 
  return (
      <form onSubmit={ addName}>
        <div>
          name: <input value={ newName}
                        onChange={ handleNameChange} />
        </div>

        <div>
          number: <input value={ newNumber}
                        onChange={ handleNumberChange} />
        </div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons =({personsToShow }) => (
  <ul>
      { personsToShow.map((person,index) =>
        <li key={ index}>
          { person.name } { person.number }
        </li>
      ) }
      </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=> { 
    axios
      .get('http://localhost:3001/persons')
      .then(response => { 
        setPersons(response.data)
      })
  }, [])


  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setShowAll(false)
  }


  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
 

  const addName =(event)=>{ 
    event.preventDefault()
    const nameObject = { 
      name: newName,
      number: newNumber
    }

    const exists = persons.some(person => person.name === newName)
    if (exists) { 
      alert(`${ newName} is already in the phonebook`)
    } else { 
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName } newName={ newName} handleNameChange={ handleNameChange} newNumber={ newNumber} handleNumberChange={ handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App