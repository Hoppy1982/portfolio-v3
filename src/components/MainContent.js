import React, { Component } from 'react'
import styles from './mainContent.css'
import ContentHome from './ContentHome'
import ContentOne from './ContentOne'


class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
            <ContentOne />
        }
      </main>
    )
  }
}


export default MainContent
