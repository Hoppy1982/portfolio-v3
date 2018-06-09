import React, { Component } from 'react'
import {
  NavLink
} from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faGithubSquare,
  faTwitterSquare
} from '@fortawesome/fontawesome-free-brands'
import './footer.css'


class Footer extends Component {
  render() {
    return(
      <footer>
        <a className='link' href='https://github.com/Hoppy1982'>
          <FontAwesomeIcon className='link__icon' icon={faGithubSquare} />
        </a>
        <a className='link' href='https://twitter.com/Markhopcraft'>
          <FontAwesomeIcon className='link__icon' icon={faTwitterSquare} />
        </a>
      </footer>
    )
  }
}


export default Footer

//<NavLink to='/' activeClassName='active' exact={true} className='navbar__link'>Home</NavLink>
