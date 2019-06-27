import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development!'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
        <Header c={course} />
        <div>
            <Content
                p1={part1} ex1={exercises1}
                p2={part2} ex2={exercises2}
                p3={part3} ex3={exercises3} />
        </div>
        <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
    return (
    <>
        <h1>{props.c}</h1>
    </>
    )
}

const Content = (props) => {
    return (
    <div>
        <Part p={props.p1} ex={props.ex1} />
        <Part p={props.p2} ex={props.ex2} />
        <Part p={props.p3} ex={props.ex3} />
    </div>
    )
  }

  const Part = (props) => {
      return (
          <>
          <p>{props.p} {props.ex}</p>
          </>
      )
  }

const Total = (props) => {
    return (
    <>
        <p>Number of exercises {props.number}</p>
    </>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))