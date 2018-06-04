import React, { Component } from 'react'
import './app.css'
import MainHeader from './MainHeader'
import MainContent from './MainContent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentContent: 'home'
    }

    this.handleSelectContent = this.handleSelectContent.bind(this)
  }


  handleSelectContent(content) {
    this.setState({
      currentContent: content
    })
  }


  render() {
    return (
      <div id="pageContainer">
        <MainHeader onSelectContent={this.handleSelectContent} />
        <MainContent content={this.state.currentContent}/>
        <footer>Footer</footer>
      </div>
    )
  }
}

export default App;
