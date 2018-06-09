import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import ProjectsAll from './ProjectsAll'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div id="pageContainer">
        <Header  />
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/projects' component={ProjectsAll} />
            </Switch>
          </main>
        <Footer />
      </div>
    )
  }
}


export default App;
