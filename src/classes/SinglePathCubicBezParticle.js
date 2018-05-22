import canvasHelpers from '../utils/canvasHelpers'
import Particle from './Particle.js'

class SinglePathCubicBezParticle extends Particle {
  constructor(coords, speed, distMoved) {
    super(coords, speed, distMoved)
  }

  updatePos() {
    this.distMoved += this.speed
    if(this.distMoved >= 1) {
      let prevCoords = {
        x0: this.coords.x0,
        y0: this.coords.y0,
        x1: this.coords.x1,
        y1: this.coords.y1,
        cp1x: this.coords.cp1x,
        cp1y: this.coords.cp1y,
        cp2x: this.coords.cp2x,
        cp2y: this.coords.cp2y
      }

      this.coords = {
        x0: prevCoords.x1,
        y0: prevCoords.y1,
        x1: prevCoords.x0,
        y1: prevCoords.y0,
        cp1x: prevCoords.cp2x,
        cp1y: prevCoords.cp2y,
        cp2x: prevCoords.cp1x,
        cp2y: prevCoords.cp1y
      }
      this.distMoved = 0


    }
    this.coords.x = canvasHelpers.coordsOnCubicBezier(this.distMoved, this.coords.x0, this.coords.cp1x, this.coords.cp2x, this.coords.x1)
    this.coords.y = canvasHelpers.coordsOnCubicBezier(this.distMoved, this.coords.y0, this.coords.cp1y, this.coords.cp2y, this.coords.y1)
  }
}

export default SinglePathCubicBezParticle
