import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(content))
    
    dispatch(setNotification(`You added ${content}`))
    setTimeout(() => {
        dispatch(setNotification(''))
    }, 5000)

    setContent('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <h2>create new anecdote</h2>
          <input 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="write new anecdote here..."
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm