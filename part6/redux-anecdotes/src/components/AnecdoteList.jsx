import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react' // Add useMemo hook
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => { 
    const dispatch = useDispatch()
    // 1. Get raw anecdotes from state
    const anecdotes = useSelector(state => {
            console.log(state)

        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    
    // 2. Memoize sorted anecdotes
    const sortedAnecdotes = useMemo(() => {
        return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }, [anecdotes]) // Only recompute when anecdotes change

    const handleVote = (id,  content) => { 
        dispatch(vote(id))

        dispatch(setNotification(`You voted for ${content}`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return ( 
        <>
        {sortedAnecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        ))}
        </>
    )
}

export default AnecdoteList