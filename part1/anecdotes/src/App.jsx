import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick }>{ props.text}</button>
)
const App = () => {
  const n = 8
  const votes = Array(8).fill(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState(votes)
  const [maxed, setMaxed] = useState(0)

  const handleRandom = () => { 
    const randomPos = Math.floor( Math.random() * anecdotes.length)
    setSelected(randomPos)
  }
  const handleVote = () => { 
    const newVote = voteArray[selected] + 1
    const newVoteArray = voteArray.map((item, index) => 
      index === selected ? newVote : item
    ) 
    
    setVoteArray(newVoteArray)
  
    // handle max
    const max = Math.max(...voteArray)
    console.log(max)
    const newMaxed = voteArray.indexOf(max)
    setMaxed(newMaxed)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voteArray[selected] } votes.</p>
      
      <Button onClick={ handleVote} text='vote' />
      <Button onClick={ handleRandom} text='next anecdote'/>

      <h1>Anecdote with most votes</h1>
      <p>{ anecdotes[maxed]}</p>
      <p>has { voteArray[maxed]} votes.</p>

    </div>
  )
}

export default App