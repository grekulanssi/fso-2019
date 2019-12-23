import React from 'react';
import Course from './components/Course'

function App({ courses }) {
  var mappedCourses = courses.map((course) => <Course course={course} />)

  return (
      <div>
          <h1>Web development curriculum</h1>
          {mappedCourses}
      </div>
  )
}

export default App;
