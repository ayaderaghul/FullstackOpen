import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { useNotification } from "./components/NotificationContext";
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
const App = () => {
  const [, dispatch] = useNotification();

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
    console.log('Server response:', updatedAnecdote)
    queryClient.invalidateQueries(['anecdotes'])
  },
  onError: (error) => {
    console.error('Update failed:', error.response?.data || error.message)
  }
  })

  const handleVote = (anecdote) => {
    // console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: "SET_NOTIFICATION", payload: `You voted '${anecdote.content}'` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div> loading data...</div>
  }

  if (result.isError) {
    return <div> anecdotes service not available due to error in the server </div>
  }

  const anecdotes = result.data

  return (
    <div>

      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
