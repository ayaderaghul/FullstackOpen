import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine =(props) => { 
  return (
    <tr>
      <td> {props.text } </td>
      <td> { props.value}  {  props.text === 'positive' ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) { 
    return (
      <div>
        <h1>Statistics</h1>
        <p>give feedback to see statistics</p></div>
    )
  } 
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text='good' value={ props.good} />
      <StatisticLine text='neutral' value={ props.neutral} />
    <StatisticLine text='bad' value={ props.bad} />
    <StatisticLine text='all' value={ props.all} />
    <StatisticLine text='average' value={ props.average} />
    <StatisticLine text='positive' value={ props.positive} />  
        
    </div>
)}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1 
    setGood(updatedGood)
    const total = updatedGood+bad+neutral
    setAll(total)
    const aver = total / 3
    setAverage(aver)
    const pos = updatedGood/total*100
    setPositive(pos)
  }
  const handleNeutral=  () => { 
    const updatedNeutral = neutral+ 1 
    setNeutral(updatedNeutral)
    const total = good+bad+updatedNeutral
    setAll(total)
    const aver = total / 3
    setAverage(aver)
    setPositive(good/total *100)
  }
  const handleBad=  () => { 
    const updatedBad = bad + 1 
    setBad(updatedBad)
    const total = good+updatedBad+neutral
    setAll(total)
    const aver = total / 3
    setAverage(aver)
    setPositive(good/total *100)
  }
  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={ handleGood } text='good' ></Button>  
    <Button onClick={handleNeutral } text='neutral' ></Button>  
    <Button onClick={ handleBad } text='bad' ></Button>  

    <Statistics good={ good} neutral={ neutral}
      bad={ bad} all={ all} average={ average}
      positive={ positive}
    />
    
    </>
  )
}

export default App