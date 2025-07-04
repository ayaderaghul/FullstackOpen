import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl ='/api/persons'

const getAll = () => { 
  return axios.get(baseUrl)
    .then(response => {
      console.log('GET Response:', response.data)
      return response.data
    })
    .catch(error => {
      console.error('GET Error:', error)
      throw error
    })
}
const create = newObject => { 
    
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => { 
    const request = axios.delete(`${baseUrl }/${id }`)
    return request.then(response => response.data )
}


const update = (id, updatedPerson) => { 
    const request = axios.put(`${baseUrl }/${id }`, updatedPerson)
    return request.then(response => response.data)
}

export default { 
    getAll, create, deletePerson, update
}