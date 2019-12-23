import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Fourth part',
                exercises: 2,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header c={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

/*
<Total parts={course.parts} />
*/


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

    const allparts = props.parts.map(part => <Part key={part.name} name={part.name} ex={part.exercises} />)

    return (
        <div>
            {allparts}
        </div>
    )
}

const Part = (props) => {
    console.log('PART:')
    console.log(props)
    return (
        <>
            <p>{props.name} {props.ex}</p>
        </>
    )
}

/*
const Total = (props) => {
    console.log('TOTAL:')
    console.log(props)

    let total = 0
    props.parts.forEach(part => {
        total += part.exercises
    });

    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}
*/

ReactDOM.render(<App />, document.getElementById('root'))