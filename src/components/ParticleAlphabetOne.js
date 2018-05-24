import React, { Component } from 'react'
import styles from './particleAlphabetOne.css'

import canvasHelpers from '../utils/canvasHelpers'
import lettersLib from '../utils/lettersLib'

import HoldPatternParticle from '../classes/HoldPatternParticle'
import CharPatternParticle from '../classes/CharPatternParticle'


class ParticleAlphabetOne extends Component {
  constructor(props) {
    super(props)

    this.CHAR_PATTERN_WORDS = 'DEFAULT'
    this.MAX_CHARS_PER_ROW = 12
    this.TOTAL_PARTICLES = 400
    this.HOLD_PATTERN_WAYPOINTS = [//coords as % of canvas size
      {x: 0.125, y: 0.5},
      {x: 0.25, y: 0.125},
      {x: 0.75, y: 0.125},
      {x: 0.875, y: 0.5},
      {x: 0.75, y: 0.875},
      {x: 0.25, y: 0.875}
    ]
    this.HOLD_SPEED = 0.0025
    this.canvasWidth = this.props.canvasWidth
    this.canvasHeight = this.props.canvasHeight
    this.holdPatternWaypointsActual = []//coords in pixels, recalculated on resize
    this.holdPatternParticles = []
    this.charPatternParticles = []
    this.frameId

    this.storeRef = this.storeRef.bind(this)
    this.animate = this.animate.bind(this)
    this.reset = this.reset.bind(this)
  }



//---------------------------STRING REFS ARE DEPRECATED SO USE JAKES WAY
  storeRef = (element) => {
    this.element = element
    if(element !== null)  {//no ide why but I think unmount is somehow calling this function which breaks without this bit
      this.ctx = element.getContext('2d')
    }
  }


//---------------------------------------------------FLOW CONTROL & INITIALIZERS
  init() {
    this.CHAR_PATTERN_WORDS = this.props.targetWord
    this.reset()
    //setLayout()
    //NAV_TOPIC_ELEMENT.innerHTML = carousel2d.getNavTopicText()
    //navItemDescription.innerHTML = carousel2d.getNavItemDesc()
    this.calcHoldPatternWaypointCoords()
    this.initHoldPatternParticles(this.TOTAL_PARTICLES)
    this.animate()
    this.formNewParticleWord()
  }


  reset() {
    cancelAnimationFrame(this.frameId)
    this.holdPatternWaypointsActual.length = 0
    this.holdPatternParticles.length = 0
    this.charPatternParticles.length = 0
  }


  calcHoldPatternWaypointCoords() {
    this.holdPatternWaypointsActual = this.HOLD_PATTERN_WAYPOINTS.map(el => {
      return {x: el.x * this.canvasWidth, y: el.y * this.canvasHeight}
    })
  }


  initHoldPatternParticles(nParticles) {
    for(let i = 0; i < nParticles; i++) {
      let fromWP = Math.floor(Math.random() * 6)
      let nextWP = fromWP + 1 === this.HOLD_PATTERN_WAYPOINTS.length ? 0 : fromWP + 1
      let distMoved = Math.round( Math.random() * 10 ) / 10
      let startCoords = canvasHelpers.randPointNearPoint(this.holdPatternWaypointsActual[fromWP])
      let endCoords = canvasHelpers.randPointNearPoint(this.holdPatternWaypointsActual[nextWP])
      let cp1Coords = canvasHelpers.randPointBetweenTwoPoints(startCoords, endCoords)
      let cp2Coords = canvasHelpers.randPointBetweenTwoPoints(startCoords, endCoords)
      let coords = {
        x: startCoords.x, y: startCoords.y,
        x0: startCoords.x, y0: startCoords.y,
        x1: endCoords.x, y1: endCoords.y,
        cp1x: cp1Coords.x, cp1y: cp1Coords.y,
        cp2x: cp2Coords.x, cp2y: cp2Coords.y
      }

      this.holdPatternParticles.push( new HoldPatternParticle(coords, this.HOLD_SPEED, distMoved, nextWP) )
    }
  }


  formNewParticleWord() {
    cancelAnimationFrame(this.frameId)//not sure if needed
    this.charToHoldTransition()
    this.holdToCharTransition()
    this.animate()//not sure if needed
  }


//----------------------------------TRANSITION PARTICLES BETWEEN BEHAVIOUR TYPES
  holdToCharTransition() {
    let requiredParticles = lettersLib.totalRequiredParticles(this.CHAR_PATTERN_WORDS)
    let wordsInRows = lettersLib.placeWordsInRows(this.CHAR_PATTERN_WORDS, this.MAX_CHARS_PER_ROW)
    let destinationsAndTargets = lettersLib.calcLetterParticlesDestAndTargets(wordsInRows, this.canvasWidth, this.canvasHeight)

    if (this.holdPatternParticles.length > requiredParticles) {
      for(let i = 0; i < requiredParticles; i++) {
        let transferringParticle = this.holdPatternParticles.pop()
        let coords = {
          x: transferringParticle.coords.x,
          y: transferringParticle.coords.y,
          x0: transferringParticle.coords.x,
          y0: transferringParticle.coords.y,
          x1: destinationsAndTargets[i].x1,
          y1: destinationsAndTargets[i].y1
        }

        let speed = this.HOLD_SPEED * 4
        let distMoved = 0
        let pointsAt = destinationsAndTargets[i].pointsAt
        this.charPatternParticles.push(new CharPatternParticle(coords, speed, distMoved, pointsAt))
      }

    }
  }


  charToHoldTransition() {
    while(this.charPatternParticles.length > 0) {
      let transferringParticle = this.charPatternParticles.pop()
      let distMoved = 0
      let speed =  Math.round( (Math.random() * (this.HOLD_SPEED * 10 - this.HOLD_SPEED) + this.HOLD_SPEED) * 1000 ) / 1000
      let fromWP = Math.floor(Math.random() * 6)
      let nextWP = fromWP + 1 === this.HOLD_PATTERN_WAYPOINTS.length ? 0 : fromWP + 1
      let startCoords = {x: transferringParticle.coords.x, y: transferringParticle.coords.y}
      let endCoords = canvasHelpers.randPointNearPoint(this.holdPatternWaypointsActual[nextWP])
      let cp1Coords = canvasHelpers.randPointBetweenTwoPoints(startCoords, endCoords)
      let cp2Coords = canvasHelpers.randPointBetweenTwoPoints(startCoords, endCoords)
      let coords = {
        x: startCoords.x,
        y: startCoords.y,
        x0: startCoords.x,
        y0: startCoords.y,
        x1: endCoords.x,
        y1: endCoords.y,
        cp1x: cp1Coords.x,
        cp1y: cp1Coords.y,
        cp2x: cp2Coords.x,
        cp2y: cp2Coords.y
      }

      this.holdPatternParticles.unshift(new HoldPatternParticle(coords, speed, distMoved, nextWP))
    }
  }


//--------------------------------------------UPDATE PARTICLE POSITIONS & RENDER
  animate() {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    //canvasHelpers.renderBoundingCircle(ctx, canvasWidth, canvasHeight)//dev
    //canvasHelpers.renderHoldPatternWPs(ctx, holdPatternWaypointsActual)//dev
    //canvasHelpers.renderHoldPatternParticlePaths(ctx, holdPatternParticles)//dev
    this.updateHoldPatternParticles()
    this.updateCharPatternParticles()
  }


  updateHoldPatternParticles() {
    this.holdPatternParticles.forEach(particle => {
      particle.updatePos(this.HOLD_PATTERN_WAYPOINTS, this.holdPatternWaypointsActual, this.HOLD_SPEED)
      particle.draw(this.ctx, 'white')
    })
  }


  updateCharPatternParticles() {
    this.charPatternParticles.forEach((particle, index) => {
      particle.updatePos()
      particle.draw(this.ctx)
      particle.drawToPointsAt(this.ctx, this.charPatternParticles, index)
    })
  }


//-----------------------------------------------------------------REACT METHODS
  componentDidMount() {
    this.init()
  }


  componentDidUpdate() {
    this.init()
  }


  componentWillUnmount() {
    this.reset()
  }


  render() {
    return(
      <div className="tempWrapper">
        <canvas ref={this.storeRef} width={this.props.canvasWidth} height={this.props.canvasHeight}></canvas>
      </div>
    )
  }
}

export default ParticleAlphabetOne
