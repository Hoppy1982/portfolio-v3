class Particle {
  constructor(coords, speed, distMoved) {
    this.coords = coords
    this.speed = speed
    this.distMoved = distMoved
  }

  draw(ctx) {//default self render for particles, maybe change later
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.fillStyle = 'white'
    ctx.arc(this.coords.x, this.coords.y, 3, 0, Math.PI * 2, false)
    ctx.fill()
  }

  updatePos() {
    this.coords.x += this.speed
    this.coords.y += this.speed
  }
}

export default Particle
