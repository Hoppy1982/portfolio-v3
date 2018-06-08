import React, { Component } from 'react'
import {
  NavLink
} from 'react-router-dom'
import './nav.css'

class Nav extends Component {
  render() {
    return(
      <nav className='navbar'>
        <NavLink to='/' activeClassName='active' exact={true} className='navbar__link'>Home</NavLink>
        <NavLink to='/about' activeClassName='active' className='navbar__link'>About</NavLink>
        <NavLink to='/projects' activeClassName='active' className='navbar__link'>Projects</NavLink>
      </nav>
    )
  }
}


export default Nav
