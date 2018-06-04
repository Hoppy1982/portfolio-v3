import React, { Component } from 'react'
import './nav.css'

class Nav extends Component {
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
