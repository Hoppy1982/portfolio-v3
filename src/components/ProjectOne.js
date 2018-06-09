import React, { Component } from 'react'
import ParticleAlphabetOne from './ProjectOneParticleAlphabet'
import './projectOne.css'


class ProjectOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentOneTargetWord: 'PARTICLE ALPHABET ONE',
      contentOneRenderWaypoints: false,
      contentOneRenderPaths: false,
      contentOneCanvasWidth: 100,
      contentOneCanvasHeight: 100
    }

    this.updateCanvasDimensions = this.updateCanvasDimensions.bind(this)
    this.contentOneHandleTargetWordChange = this.contentOneHandleTargetWordChange.bind(this)
    this.contentOneHandleToggleWP = this.contentOneHandleToggleWP.bind(this)
    this.contentOneHandleTogglePaths = this.contentOneHandleTogglePaths.bind(this)
  }


  contentOneHandleTargetWordChange(event) {
    let sanatizedStr = event.target.value.replace(/[^a-zA-Z\s]/gi, '').toUpperCase()
    this.setState({contentOneTargetWord: sanatizedStr})
  }


  contentOneHandleToggleWP() {
    this.setState({contentOneRenderWaypoints: !this.state.contentOneRenderWaypoints})
  }


  contentOneHandleTogglePaths() {
    this.setState({contentOneRenderPaths: ! this.state.contentOneRenderPaths})
  }


  componentDidMount() {
    this.updateCanvasDimensions();
    window.addEventListener('resize', this.updateCanvasDimensions);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasDimensions);
  }


  updateCanvasDimensions() {
    let desiredWidth

    if(window.innerWidth <= 400) {
      desiredWidth  =  window.innerWidth * 0.9
    }

    if(window.innerWidth > 400) {
      desiredWidth  =  400
    }


    this.setState({
      contentOneCanvasWidth: desiredWidth,
      contentOneCanvasHeight: desiredWidth
    })
  }


  render() {
    return(
      <div className='projectContainer'>
        <h2 className='projectHeading'>Particle Alphabet</h2>

        <div className='projectLayout'>
          <div className='canvasAndDescription'>
            <div className='canvasAndControlsContainer'>
              <div className='canvasWrapper'>
                <ParticleAlphabetOne
                  canvasWidth={this.state.contentOneCanvasWidth}
                  canvasHeight={this.state.contentOneCanvasHeight}
                  targetWord={this.state.contentOneTargetWord}
                  renderWaypoints={this.state.contentOneRenderWaypoints}
                  renderPaths={this.state.contentOneRenderPaths}
                />
              </div>
              <div className='controls'>
                <div className='controls__inputContainer'>
                  <div className='controls__inputDesc'>Type in the box:</div>
                  <input className='controls__input' type="text" value={this.state.value} onChange={this.contentOneHandleTargetWordChange} className='control'></input>
                </div>
                <div className='controls__buttonsContainer'>
                  <button onClick={this.contentOneHandleToggleWP} className='controls__button'>Toggle Waypoints</button>
                  <button onClick={this.contentOneHandleTogglePaths} className='controls__button'>Toggle Paths</button>
                </div>
              </div>
            </div>

            <article className='projectDescription'>
              <h4 className='articleHeading'>Project Desciption</h4>
              <p>
                I made this in vanilla javascript without using any libraries other
                than React with the idea that it would be good practice at using
                classes to organise the different particle behaviours. Originally
                I thought I could use it as full page navigation system. I was going
                to have the particles form the chosen nav link then all zoom off down
                a wormhole. They'd then zoom out of wormhole on the destination
                page and do something else like make an animated pomodoro timer.
                In the end though I settled on leaving it as a self contained project.
              </p>
            </article>
          </div>

          <article className='howItWorks'>
            <h4 className='articleHeading'>How It Works</h4>
            <p>
              There are 3 particle classes, a super Particle class and then sub
              classes for HoldPatternParticle & LettersParticle. The 2 particle
              types live in separate arrays. To transition between behaviour types
              they're pretty much just popped off one array and onto the other.
            </p>
            <p>
              The hold pattern particles follow cubic bezier curves. Those curves
              are defined by 4 coordinates, start, end & 2 control points. I used
              an array of pre-determined waypoints and randomized a little distance
              from those to get the start and end points. The control points are
              pretty much randomized inside a square whose diagonals are bound by
              the start and end points.
            </p>
            <p>
              For the letters particles I created an array of shape objects which
              specificies the coordinates of each character vertex as a ratio of the
              space assigned to each character. The space assigned to each character
              is dependent on the longest word provided. Letter particles are given
              target vertex to fly to.
            </p>
          </article>

          <div className='stuffUsed'>
            <h4 className='stuffUsed__heading'>Stuff Used</h4>
            <ul className='stuffUsed__list'>
              <li>Html</li>
              <li>Css</li>
              <li>Javascript</li>
              <li>Canvas</li>
              <li>React</li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}


export default ProjectOne
