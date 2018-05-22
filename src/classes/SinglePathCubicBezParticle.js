import canvasHelpers from '../utils/canvasHelpers'
import Particle from './Particle.js'

class SinglePathCubicBezParticle extends Particle {
  constructor(coords, speed, distMoved) {
    super(coords, speed, distMoved)
  }

  updatePos() {
    this.distMoved += this.speed
    if(this.distMoved >= 1) {
      this.distMoved = 0

    }
    this.coords.x = canvasHelpers.coordsOnCubicBezier(this.distMoved, this.coords.x0, this.coords.cp1x, this.coords.cp2x, this.coords.x1)
    this.coords.y = canvasHelpers.coordsOnCubicBezier(this.distMoved, this.coords.y0, this.coords.cp1y, this.coords.cp2y, this.coords.y1)
  }
}

export default SinglePathCubicBezParticle
