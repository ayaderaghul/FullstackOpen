import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const search = (name) => {
  return axios
    .get(`${baseUrl}/name/${name}`)
    .then(response => response.data)
}

export default {
  search
}