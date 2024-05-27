const width = 600
const height = 600
const size = 20
const bombs = 50

let grid
let game_over

function setup() {
  createCanvas(width, height)

  grid = new HexGrid(width, height, size)
  grid.make_bombs(bombs)
  grid.count_bombs()
}

function draw() {
  background(50)
  grid.show()
  grid.unhide_connected_zeroes()

  let won = grid.has_won()

  if (game_over || won) {
    message = won ? "Winner!" : "Game Over!"
    stroke(0)
    fill(255)
    textSize(50)
    textAlign(CENTER);
    text(message, width / 2, height / 2)
    noLoop()
  }

}

function mousePressed() {
  let hex = grid.coords_to_hex(mouseX, mouseY)

  if (
    (
      mouseButton === RIGHT ||
      (
        keyCode === SHIFT &&
        keyIsPressed
      )
    )
    &&
    !hex.is_show
  ) {
    hex.flag()
    return
  }

  if (hex.is_flag) {
    return
  }

  hex.unhide()

  if (hex.is_bomb) {
    game_over = true
    grid.unhide_all_bombs()
  }
}

function keyPressed() {
  if (key == ' ') {
    game_over = false
    setup()
    loop()
  }
}

