const width = 600
const height = 600

function setup() {
  createCanvas(width, height)

  grid = new HexGrid(width, height, 20)
  grid.make_bombs(30)
  grid.count_bombs()
}

function draw() {
  background(50)
  grid.show()
}

function mousePressed() {
  let hex = grid.coords_to_hex(mouseX, mouseY)

  hex.unhide()
}


