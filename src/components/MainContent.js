import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import './mainContent.css'
import ContentHome from './ContentHome'
import ProjectsAll from './ProjectsAll'


class MainContent extends Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={ContentHome} />
          <Route path='/about' component={ContentHome} />
          <Route path='/projects' component={ProjectsAll} />
        </Switch>
      </main>
    )
  }
}


export default MainContent
