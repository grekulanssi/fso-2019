import React from 'react'

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

export default Course