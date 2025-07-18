import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('hello from login service', credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log('response from login service', response.data)
  return response.data
}

export default { login }