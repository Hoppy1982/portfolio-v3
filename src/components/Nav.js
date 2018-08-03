import React, { Component } from 'react'
import {
  NavLink
} from 'react-router-dom'
import './nav.css'

class Nav extends Component {
  render() {
    return(
      <nav className='navbar'>
        <NavLink to='/home' activeClassName='active' exact={true} className='navbar__link'>Home</NavLink>
        <NavLink to='/sites' activeClassName='active' className='navbar__link'>Sites</NavLink>
        <NavLink to='/projects' activeClassName='active' className='navbar__link'>Labs</NavLink>
      </nav>
    )
  }
}


export default Nav
