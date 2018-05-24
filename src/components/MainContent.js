import React, { Component } from 'react'
import styles from './mainContent.css'
import ContentHome from './ContentHome'
import ParticleAlphabetOne from './ParticleAlphabetOne'


class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetWord: 'PARTICLE ALPHABET ONE'
    }

    this.handleTargetWordChange = this.handleTargetWordChange.bind(this)
  }


  handleTargetWordChange(event) {
    let sanatizedStr = event.target.value.replace(/[^a-zA-Z\s]/gi, '').toUpperCase()
    this.setState({targetWord: sanatizedStr})
  }


  render() {
    return(
      <main>
        {
          this.props.content === 'home' &&
            <ContentHome />
        }
        {
          this.props.content === 'particleAlphabet#1' &&
          <div>
            <ParticleAlphabetOne canvasWidth='400' canvasHeight='400' targetWord={this.state.targetWord} />
            <div id='particleAlphabetOneControls'>
              <span>Type in the box:</span>
              <input type="text" value={this.state.value} onChange={this.handleTargetWordChange}></input>
            </div>
          </div>
        }
      </main>
    )
  }
}


export default MainContent
