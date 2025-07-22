import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote, createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    

    dispatch(createAnecdote(content))
    dispatch(setNotificationWithTimeout(`you added '${content}'`, 10))

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <h2>create new anecdote</h2>
          <input 
            name='anecdote'
            placeholder="write new anecdote here..."
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm