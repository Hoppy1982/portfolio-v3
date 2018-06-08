import React, { Component } from 'react'
import './app.css'
import MainHeader from './MainHeader'
import MainContent from './MainContent'

class App extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div id="pageContainer">
        <MainHeader  />
        <MainContent />
        <footer>Footer</footer>
      </div>
    )
  }
}

export default App;
