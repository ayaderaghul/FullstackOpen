import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote, createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addAnecdote(content))
    
    dispatch(setNotification(`You added ${content}`))
    setTimeout(() => {
        dispatch(setNotification(''))
    }, 5000)

    setContent('')

    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
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