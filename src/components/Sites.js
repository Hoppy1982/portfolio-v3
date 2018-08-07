import React, { Component } from 'react'
import './sites.css'
import thumbnailCodingRef from '../images/site-coding-reference.png'
import thumbnailSimon from '../images/simon-link.png'
import thumbnail2DCarousel from '../images/2d-carousel-link.png'
import thumbnailCalc from '../images/calculator-link.png'


class Sites extends Component {
  render() {
    return(
      <section className='ext-sites-all'>

        <div className='ext-site'>
          <img className='ext-site__img' src={thumbnailCodingRef}></img>
          <p className='ext-site__desc'>
            <strong>Coding Reference:- </strong>
            Site I'm working on to keep a record of things I've learnt
            and as a reference for things I often use.
          </p>
          {/*<a className='ext-site__link' href='https://hoppy1982.github.io/learning-record/'>..visit site..</a>*/}
          <a className='ext-site__link' href='https://www.learning-record.markhopcraft.co.uk/'>..visit site..</a>
        </div>

        <div className='ext-site'>
          <img className='ext-site__img' src={thumbnailSimon}></img>
          <p className='ext-site__desc'>
            <strong>Simon Game:- </strong>
            This was one of the first projects when I started learning to code in 2016
            from working through the frontend cert of freeCodeCamp.
          </p>
          <a className='ext-site__link' href='https://codepen.io/Hoppington/pen/vxqEeq'>..visit site..</a>
        </div>

        <div className='ext-site'>
          <img className='ext-site__img' src={thumbnail2DCarousel}></img>
          <p className='ext-site__desc'>
            <strong>2D Carousel:- </strong>
            This an idea for a kind of carousel that worked in 2 dimensions.
            It works by destroying and remaking elements as you scroll. I used it
            on an older version of my portfolio site to make a nav menu with categories
            left to right with links vertically inside each.
          </p>
          <a className='ext-site__link' href='https://codepen.io/Hoppington/pen/yjjYMK'>..visit site..</a>
        </div>

        <div className='ext-site'>
          <img className='ext-site__img' src={thumbnailCalc}></img>
          <p className='ext-site__desc'>
            <strong>Calculator:- </strong>
            Another freeCodeCamp project from a couple of years ago. On this one I was trying to
            get as close to the look of the example project without looking at the source css.
          </p>
          <a className='ext-site__link' href='https://codepen.io/Hoppington/pen/gmzpzj'>..visit site..</a>
        </div>

      </section>
    )
  }
}



export default Sites
