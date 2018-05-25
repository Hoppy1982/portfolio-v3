import React, { Component } from 'react'
import styles from './nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <nav>
        <ul>
          <li onClick={() => this.props.onSelectContent("home")}>Home</li>
          <li onClick={() => this.props.onSelectContent("particleAlphabet#1")}>Particle Alphabet</li>
          <li onClick={() => this.props.onSelectContent("worldBankAPI")}>World Bank API</li>
        </ul>
      </nav>
    )
  }
}


export default Nav
