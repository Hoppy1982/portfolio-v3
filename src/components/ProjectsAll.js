import React, { Component } from 'react'
import ProjectOne from './ProjectOne'
import ProjectTwo from './ProjectTwo'
import './projectsAll.css'


class ProjectsAll extends Component {
  render() {
    return(
      <div className='projectsWrapper'>
        <ProjectOne />
        <ProjectTwo />
      </div>
    )
  }
}


export default ProjectsAll
