import React, { Component } from 'react'
import styles from './mainContent.css'
import ContentHome from './ContentHome'
import ContentParticleAlphabetOne from './ContentParticleAlphabetOne'


class MainContent extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return(
      <main>
        {
          this.props.content === 'home'
          ? <ContentHome />
          : null
        }
        {
          this.props.content === 'particleAlphabet#1'
          ? <ContentParticleAlphabetOne canvasWidth='400' canvasHeight='400'/>
          : null
        }
      </main>
    )
  }
}


export default MainContent
