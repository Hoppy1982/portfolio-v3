import React, { Component } from 'react'
import './header.css'
import LogoOne from './LogoOne'
import Nav from './Nav'

import {
  Route
} from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleRouteChange = this.handleRouteChange.bind(this)
  }

  handleRouteChange() {
    setTimeout(() => {
      this.refs.bottomLine.classList.remove('bottomLineWide')
    }, 10)

    setTimeout(() => {
      this.refs.bottomLine.classList.add('bottomLineWide')
    }, 1000)
  }

  componentDidMount() {
    this.handleRouteChange()
  }


  render() {
    return (
      <header>
        <LogoOne />
        <div ref={"bottomLine"} className="bottomLine"></div>
        <Nav />
        <Route onChange={this.handleRouteChange()}/>
      </header>
    )
  }
}

export default Header
