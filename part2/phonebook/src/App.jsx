import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Persons =({personsToShow, onDelete }) => (
  <ul>
      { personsToShow.map((person,index) =>
        <li key={ index}>
          { person.name } { person.number } 
          <button type="submit" 
          onClick={()=>onDelete(person.id)}
           >delete</button>
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
    personService
      .getAll()
      .then(initialPersons => { 
        setPersons(initialPersons)
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

    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) { 
      if (window.confirm (`${ newName} is already in the phonebook, replace the old number with a new one?`))
        { 
          personService
            .update(existingPerson.id, { ...existingPerson, number: newNumber})
            .then(updatedPerson => { 
              setPersons(persons.map(p=>p.id === existingPerson.id ? updatedPerson :p))
              setNewName('')
              setNewNumber('')
            })
        }
        
    } else { 

      personService
        .create(nameObject)
        .then(returnedPerson => { 
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))


  const deletePerson = (id) => { 
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${ person.name}?`)) { }
      personService.deletePerson(id)
        .then(() => { 
          setPersons(persons.filter(p=>p.id!==id))
        })
        
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName } newName={ newName} handleNameChange={ handleNameChange} newNumber={ newNumber} handleNumberChange={ handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={ deletePerson}/>
    </div>
  )
}

export default App