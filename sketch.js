const width = 600
const height = 600

function setup() {
  createCanvas(width, height)

  grid = new HexGrid(width, height, 20)
}

function draw() {
  background(50)
  grid.show()
}

function mousePressed() {
  let hex = grid.coords_to_hex(mouseX, mouseY)

  hex.selected ^= true
}

class HexGrid {
  constructor(width, height, radius) {
    // Store locals
    this.width = width
    this.height = height
    this.radius = radius

    // This is the hexes in the x axis tip to tip
    this.width_in_hexes = int(this.width / (2 * this.radius))
    // This is the
    this.height_in_hexes = int(this.height / (1 * (this.radius * sin(PI / 3)))) + 2

    // Make centers
    this.centers = new Array(this.width_in_hexes)
    for (var i = 0; i < this.width_in_hexes; i++) {

      this.centers[i] = new Array(this.height_in_hexes)

      for (var j = 0; j < this.height_in_hexes; j++) {
        let short_radius = this.radius * sin(PI / 3)
        let x = (this.radius * 3 * i) + ((j & 1) * 1.5 * this.radius)
        let y = short_radius * 1 * j

        this.centers[i][j] = { x, y }
      }
    }

    // Make Hexes
    this.hexes = new Array(this.width_in_hexes)
    for (var i = 0; i < this.width_in_hexes; i++) {

      this.hexes[i] = new Array(this.height_in_hexes)

      for (var j = 0; j < this.height_in_hexes; j++) {
        let { x, y } = this.centers[i][j]

        this.hexes[i][j] = new Hexagon(x, y, this.radius)
      }
    }

  }

  show() {
    for (var i = 0; i < this.width_in_hexes; i++) {
      for (var j = 0; j < this.height_in_hexes; j++) {
        let hex = this.hexes[i][j]
        hex.show()
      }
    }
  }

  coords_to_hex(x, y) {
    let dist = (x1, y1, x2, y2) => sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2))

    let min_hex = this.hexes[0][0]
    let min_dist = dist(x, y, min_hex.x, min_hex.y)

    for (var i = 0; i < this.width_in_hexes; i++) {
      for (var j = 0; j < this.height_in_hexes; j++) {
        let new_hex = this.hexes[i][j]

        let new_dist = dist(x, y, new_hex.x, new_hex.y)

        if (min_dist > new_dist) {
          min_dist = new_dist
          min_hex = new_hex
        }
      }
    }
    return min_hex;
  }
}

class Polygon {
  constructor(x, y, r, sides) {
    // Length to vertexes
    this.r = r
    // center of polygon
    this.x = x
    this.y = y
    this.sides = sides
    this.selected = false
  }

  show(rotation = 0) {
    const arc_width = (2 * PI) / this.sides

    push()

    if (this.selected) {
      fill(100, 0, 0)
    } else {
      fill(200)
    }

    translate(this.x, this.y);
    rotate(rotation)

    beginShape()
    for (var i = 0; i < this.sides; i++) {
      const angle = arc_width * i;
      const x = (cos(angle) * this.r)
      const y = (sin(angle) * this.r)

      vertex(x, y)
    }
    endShape(CLOSE)

    pop()
  }
}

class Hexagon extends Polygon {
  constructor(x, y, r) {
    super(x, y, r, 6)
  }
}

