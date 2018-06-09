import canvasHelpers from '../utils/canvasHelpers'
import Particle from './Particle'

class CharPatternParticle extends Particle {
  constructor(coords, speed, distMoved, pointsAt) {
    super(coords, speed, distMoved)
    this.pointsAt = pointsAt
  }

  updatePos() {
    this.distMoved += this.speed
    if (this.distMoved > 1) {this.distMoved = 1}//prevent overshoot

    let newPos = canvasHelpers.coordsOnStraightLine(this.distMoved, {x: this.coords.x0, y: this.coords.y0}, {x: this.coords.x1, y: this.coords.y1})
    this.coords.x = newPos.x
    this.coords.y = newPos.y
  }

  draw(ctx) {
    ctx.beginPath()
    //let rgb = canvasHelpers.colorBetweenTwoColors(this.distMoved, '#000000', '#a9a9a9')
    //ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    ctx.fillStyle = 'grey'
    ctx.arc(this.coords.x, this.coords.y, 3, 0, Math.PI * 2, false)
    //ctx.stroke()
    ctx.fill()
  }

  drawToPointsAt(ctx, charPatternParticles, index) {
    if(this.distMoved > 0.1) {
      if(this.pointsAt !== false) {
        let pointsAtX = charPatternParticles[index + this.pointsAt].coords.x//these two lines are breaking things somehow deleting the last particle in the char I think
        let pointsAtY = charPatternParticles[index + this.pointsAt].coords.y
        ctx.beginPath()
        ctx.lineWidth = 3
        let rgb = canvasHelpers.colorBetweenTwoColors(this.distMoved, '#ffffff', '#a9a9a9')
        ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        ctx.moveTo(this.coords.x, this.coords.y)
        ctx.lineTo(pointsAtX, pointsAtY)
        ctx.stroke()
      }
    }
  }
}

export default CharPatternParticle
