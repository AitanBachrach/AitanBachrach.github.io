import React from 'react';
import Project from './Project';
const projects = require('./projects.json')


function Projects(){

  const createProjects = () => {
    var elements = []
    for (const iter in projects) {
      elements.push(<Project data={projects[iter]} key={iter}/>)
    }
    return elements
  }

  return(
    <>
      <h1>these are my projects</h1>
      {createProjects()}
    </>
  )
}

export default Projects