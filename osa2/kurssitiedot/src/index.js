import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
    const courses = [
        {
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
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    var mappedCourses = courses.map((course) => <Course course={course} />)

    return (
        <div>
            <h1>Web development curriculum</h1>
            {mappedCourses}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div className="course">
            <Header c={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    console.log('HEADER:')
    console.log(props)
    return (
        <>
            <h2>{props.c}</h2>
        </>
    )
}

const Content = (props) => {
    console.log('CONTENT:')
    console.log(props)

    const allparts = props.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises} />)

    return (
        <div className="content">
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

const Total = ({ parts }) => {
    console.log('TOTAL:')
    console.log(parts)

    var total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
            <p className="total">Total of {total} excercises</p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))