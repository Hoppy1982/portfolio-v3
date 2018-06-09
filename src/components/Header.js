import React, { Component } from 'react'
import './header.css'
import LogoOne from './LogoOne'
import Nav from './Nav'

class Header extends Component {
  constructor(props) {
    super(props)

    this.applyInitialCssTransitions = this.applyInitialCssTransitions.bind(this)
  }

  componentDidMount() {
    setTimeout(this.applyInitialCssTransitions, 1000)
  }

  applyInitialCssTransitions() {
    this.refs.bottomLine.classList.add("bottomLineWide")
  }

  render() {
    return (
      <header>
        <LogoOne />
        <div ref={"bottomLine"} className="bottomLine"></div>
        <Nav />
      </header>
    )
  }
}

export default Header
