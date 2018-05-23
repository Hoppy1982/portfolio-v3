import React, { Component } from 'react'
import styles from './mainContent.css'



class MainContent extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return(
      <main>
        {
          this.props.content === 'home'
          ? <p>HOME</p>
          : null
        }
        {
          this.props.content === 'particleAlphabet#1'
          ? <p>PARTICLE ALPHABET #1</p>
          : null
        }
      </main>
    )
  }
}

export default MainContent
