import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import './sites.css'
import thumbnailCodingCef from '../images/site-coding-reference.png'

class Sites extends Component {
  render() {
    return(
      <section className='ext-sites-all'>

        <div className='ext-site'>
          <img className='ext-site__img' src={thumbnailCodingCef}></img>
          <p className='ext-site__desc'>
            <strong>Coding Reference:- </strong>
            Site I'm working on to keep a record of things I've learnt
            and as a reference for things I often use.
          </p>
          <a className='ext-site__link' href='https://hoppy1982.github.io/learning-record/'>..visit site..</a>
        </div>


      </section>
    )
  }
}



export default Sites
