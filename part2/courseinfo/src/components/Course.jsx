const Header = (props) => { 
  return (
    <h1>{ props.course}</h1>
  )
}

const Part =(props) => { 
  return (
    <p>
      { props.part.name}: { props.part.exercises} 
    </p>
  )
}

const Content = (props) => { 
  return (
    props.parts.map(part =>
    <div key={part.id }>

      <Part part={ part} />
    
    </div>
    )
    
  ) 

}

const Total =(props) => { 
  const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <p><strong>
      Total number of exercises is: {total }      
    </strong></p>
  )

}

const Course = (props) => {
 
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts } />
      <Total parts={props.course.parts} />
  
    </div>
  )

}

export default Course