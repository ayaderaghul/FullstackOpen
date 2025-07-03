import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Filter = ({ searchTerm, handleSearchChange }) => { 
  return (
    <p>find countries
      <input 
        value={searchTerm}
        onChange={handleSearchChange} 
        placeholder="Search countries..."
      />
    </p>
  )
}

const CountryDetails = ({ country }) => {
  if (!country) return null
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0] || 'N/A'}</p>
      <p>Area: {country.area?.toLocaleString() || 'N/A'} km²</p>
      
      <h3>Languages:</h3>
      <ul>
        {country.languages && Object.values(country.languages).map((lang, i) => 
          <li key={i}>{lang}</li>
        )}
      </ul>
      
      <img 
        src={country.flags?.png} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px' }} 
      />
    </div>
  )
}

const CountryList = ({ countries, onShow }) => {
  if (countries.length === 0) return null
  
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>show</button>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all countries on component mount
  useEffect(() => { 
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
        setIsLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch country data')
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  // Filter countries based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries([])
      return
    }

    const searchLower = searchTerm.toLowerCase()
    const filtered = allCountries.filter(country => 
      country.name.common.toLowerCase().includes(searchLower) ||
      (country.name.official && country.name.official.toLowerCase().includes(searchLower))
    )

    setFilteredCountries(filtered)
  }, [searchTerm, allCountries])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowCountry = (country) => {
    setFilteredCountries([country])
  }

  // Determine what to show based on filtered results
  let content = null
  let errorMessage = null

  if (isLoading) {
    content = <p>Loading countries...</p>
  } else if (error) {
    content = <p style={{ color: 'red' }}>{error}</p>
  } else if (filteredCountries.length > 10) {
    errorMessage = 'Too many matches, specify another filter'
  } else if (filteredCountries.length === 0 && searchTerm) {
    errorMessage = 'No countries found'
  } else if (filteredCountries.length === 1) {
    content = <CountryDetails country={filteredCountries[0]} />
  } else if (filteredCountries.length > 1) {
    content = <CountryList countries={filteredCountries} onShow={handleShowCountry} />
  }

  return (
    <div>
      <Filter 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
      />
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {content}
    </div>
  )
}

export default App