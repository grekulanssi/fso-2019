import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development!'
  const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
  }
  const part2 = {
      name: 'Using props to pass data',
      exercises: 7
  }
  const part3 = {
      name: 'State of a component',
      exercises: 14
  }

  return (
    <div>
        <Header c={course} />
        <div>
            <Content
                p1={part1.name} ex1={part1.exercises}
                p2={part2.name} ex2={part2.exercises}
                p3={part3.name} ex3={part3.exercises} />
        </div>
        <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

const Header = (props) => {
    console.log('HEADER:')
    console.log(props)
    return (
    <>
        <h1>{props.c}</h1>
    </>
    )
}

const Content = (props) => {
    console.log('CONTENT:')
    console.log(props)
    return (
    <div>
        <Part p={props.p1} ex={props.ex1} />
        <Part p={props.p2} ex={props.ex2} />
        <Part p={props.p3} ex={props.ex3} />
    </div>
    )
  }

  const Part = (props) => {
    console.log('PART:')
    console.log(props)
      return (
          <>
          <p>{props.p} {props.ex}</p>
          </>
      )
  }

const Total = (props) => {
    console.log('TOTAL:')
    console.log(props)
    return (
    <>
        <p>Number of exercises {props.number}</p>
    </>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))