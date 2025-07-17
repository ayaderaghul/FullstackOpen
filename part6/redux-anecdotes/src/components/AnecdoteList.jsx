import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react' // Add useMemo hook
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => { 
    // 1. Get raw anecdotes from state
    const anecdotes = useSelector(state => state)
    
    // 2. Memoize sorted anecdotes
    const sortedAnecdotes = useMemo(() => {
        return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }, [anecdotes]) // Only recompute when anecdotes change

    const dispatch = useDispatch()

    const handleVote = (id) => { 
        dispatch(vote(id))
    }

    return ( // Don't forget return statement!
        <>
        {sortedAnecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
            </div>
        ))}
        </>
    )
}

export default AnecdoteList