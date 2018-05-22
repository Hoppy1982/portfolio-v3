import React, { Component } from 'react'
import styles from './logoOne.css'
import SinglePathCubicBezParticle from '../classes/SinglePathCubicBezParticle'


class LogoOne extends Component {
  constructor(props) {
    super(props)

    let canvas
    let canvasWidth
    let canvasHeight
    let ctx
    let frameId
    let curves
    let particles

    this.animate = this.animate.bind(this)
    this.renderCurves = this.renderCurves.bind(this)
  }

  componentDidMount() {
    this.initCanvas()
    this.animate()
  }


  initCanvas() {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")
    const padding = 20
    const { width, height } = this.props
    this.canvasWidth = width
    this.canvasHeight = height
    const center = {x: width / 2, y: height / 2}
    const topLeft = {x: width / padding, y: height / padding}
    const topRight = {x: width - (width / padding), y: height / padding}
    const bottomLeft = {x: width / padding, y: height - (height / padding)}
    const bottomRight = {x: width - (width / padding), y: height - (height / padding)}
    this.particles = []
    this.curves = [
      {
        x0: center.x,
        y0: center.y,
        x1: topLeft.x,
        y1: topLeft.y,
        cp1x: width * 0.25,
        cp1y: height,
        cp2x: width * 0.25,
        cp2y: 0
      },
      {
        x0: center.x,
        y0: center.y,
        x1: bottomRight.x,
        y1: bottomRight.y,
        cp1x: width * 0.75,
        cp1y: 0,
        cp2x: width * 0.75,
        cp2y: height
      },
      {
        x0: center.x,
        y0: center.y,
        x1: topRight.x,
        y1: topRight.y,
        cp1x: 0,
        cp1y: height * 0.25,
        cp2x: width,
        cp2y: height * 0.25
      },
      {
        x0: center.x,
        y0: center.y,
        x1: bottomLeft.x,
        y1: bottomLeft.y,
        cp1x: 0,
        cp1y: height * 0.75,
        cp2x: width,
        cp2y: height * 0.75
      }
    ]


    this.curves.forEach((curve, index) => {
      let distMoved = index * 0.2
      let speed = 0.005
      let coords = {
        x0: curve.x0,
        y0: curve.y0,
        x1: curve.x1,
        y1: curve.y1,
        cp1x: curve.cp1x,
        cp1y: curve.cp1y,
        cp2x: curve.cp2x,
        cp2y: curve.cp2y,
        x: curve.x0,
        y: curve.y0
      }
      let particle = new SinglePathCubicBezParticle(coords, speed, distMoved)

      this.particles.push(particle)
    })
  }


  animate() {
    this.frameId = requestAnimationFrame(this.animate)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.renderCurves()
    this.particles.forEach((particle) => {
      particle.draw(this.ctx)
      particle.updatePos()
    })
  }


  renderCurves() {
    const curveColor = '#222'
    const curveLineWidth = 2

    this.curves.forEach((curve) => {
      this.ctx.beginPath()
      this.ctx.strokeStyle = curveColor
      this.ctx.lineWidth = curveLineWidth
      this.ctx.moveTo(curve.x0, curve.y0)
      this.ctx.bezierCurveTo(curve.cp1x, curve.cp1y, curve.cp2x, curve.cp2y, curve.x1, curve.y1)
      this.ctx.stroke()
    })
  }


  render() {
    return (
      <canvas ref="canvas" width={this.props.width} height={this.props.height}></canvas>
    )
  }
}

LogoOne.defaultProps = {
  width: 100,
  height: 100
}


export default LogoOne
