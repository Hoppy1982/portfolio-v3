import React, { Component } from 'react'
import styles from './mainContent.css'
import ContentHome from './ContentHome'
import ParticleAlphabetOne from './ParticleAlphabetOne'


class MainContent extends Component {
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

    if(window.innerWidth <= 600) {
      desiredWidth  =  window.innerWidth * 0.8
    }

    if(window.innerWidth > 600) {
      desiredWidth  =  400
    }


    this.setState({
      contentOneCanvasWidth: desiredWidth,
      contentOneCanvasHeight: desiredWidth
    })
  }


  render() {
    return(
      <main>
        {
          this.props.content === 'home' &&
            <ContentHome />
        }
        {
          this.props.content === 'particleAlphabet#1' &&
          <div>
            <div className='controls'>
              <div>
                <span className='control'>Type in the box:</span>
                <input type="text" value={this.state.value} onChange={this.contentOneHandleTargetWordChange} className='control'></input>
              </div>
              <div>
                <button onClick={this.contentOneHandleToggleWP} className='control'>Toggle Waypoints</button>
                <button onClick={this.contentOneHandleTogglePaths} className='control'>Toggle Paths</button>
              </div>
            </div>
            <div className='contentContainer'>
              <div className='canvasComponentWrapper'>
                <ParticleAlphabetOne
                  canvasWidth={this.state.contentOneCanvasWidth}
                  canvasHeight={this.state.contentOneCanvasHeight}
                  targetWord={this.state.contentOneTargetWord}
                  renderWaypoints={this.state.contentOneRenderWaypoints}
                  renderPaths={this.state.contentOneRenderPaths}
                />
              </div>
              <div className='contentDescription'>
                <h4>Particle Alphabet #1</h4>
                <p>
                  I made this from scratch without using any libraries
                  with th idea that it would be good practice at using classes to
                  organise the different particle behaviours. There's a parent 'Particle' class
                  and then two sub classes for 'HoldParticle' & 'LetterParticle'. Halfway through
                  I started learning React. React re-renders the canvas element on window resize but
                  apart from that all the internal particle rendering is done as normal. It was a bit mind bending figuring
                  where to keep all the different states. The input is santatized to only uppercase letters, all other characters are ignored.
                  I made a little library to store coordinates of each letter as a ratio of width allocated to each character.
                  At some point I want to expand it to include numbers. The swirling particles follow cubic bezier curves,
                  each has start, end and control point cordinates. The start and end points of the curves randomize near to
                  pre-positioned waypoints. With Toggle Paths on you can see the control points for each particle etc.
                  Originally I made it to use a full page navigation thingydoofer but in th end decided to leave it as a standalone project.

                </p>
                <h4>Tech</h4>
                <ul>
                  <li>Javascript</li>
                  <li>Canvas</li>
                  <li>React</li>
                </ul>
              </div>
            </div>
          </div>
        }
      </main>
    )
  }
}


export default MainContent
