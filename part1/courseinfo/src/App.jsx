const Header = (props) => { 
  return (
    <h1>{ props.course}</h1>
  )
}

const Part =(props) => { 
  return (
    <p>
      { props.contnt.part}: { props.contnt.exercises} 
    </p>
  )
}

const Content = (props) => { 
  console.log(props.content[0])
  return (
    <div>
      <Part contnt={ props.content[0]} />
      <Part contnt={ props.content[1]} />
      <Part contnt={ props.content[2]} />
    </div>
  ) 

}

const Total =(props) => { 
  return (
    <p>
      Total number of exercises is: { props.ex1 +props.ex2 +props.ex3}
    </p>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {part:'Fundamentals of React',exercises:10 },
    {part:'Using props to pass data',exercises:7 },
    {part:'State of a component',exercises:14  }]
  
  return (
    <div>
      <Header course={course} />
      <Content content={content } />
      <Total ex1={ content[0].exercises} ex2={ content[1].exercises} ex3={ content[2].exercises} />
  
    </div>
  )
}

export default App