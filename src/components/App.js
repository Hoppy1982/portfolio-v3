import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Sites from './Sites'
import ProjectsAll from './ProjectsAll'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (window.location.pathname === '/') {
      console.log(window.location.pathname)
      return <Redirect to='/home' />
    }

    return (
      <div id="pageContainer">
        <Header />
          <main>
            <Switch>
              {/*<Route exact path='/' component={Home} />not req*/}
              <Route path='/home' component={Home} />
              <Route path='/sites' component={Sites} />
              <Route path='/projects' component={ProjectsAll} />
            </Switch>
          </main>
        <Footer />
      </div>
    )
  }
}


export default App;
