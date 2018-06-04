import React, { Component } from 'react'
import './mainContent.css'
import ContentHome from './ContentHome'
import ContentOne from './ContentOne'
import ContentTwo from './ContentTwo'


class MainContent extends Component {
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
        {
          this.props.content === 'worldBankAPI' &&
          <ContentTwo />
        }
      </main>
    )
  }
}


export default MainContent
