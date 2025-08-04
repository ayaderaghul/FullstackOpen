import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
  onSuccess: (newAnecdote) => {
      // Optimistically update the cache
      queryClient.setQueryData(['anecdotes'], (old) => [...old, newAnecdote])
    },
    onError: (error) => {
      alert(`Failed to create anecdote: ${error.response?.data?.error || error.message}`)
    }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({content, votes: 0})
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
