class HexGrid {
  constructor(width, height, radius) {
    // Store locals
    this.width = width;
    this.height = height;
    this.radius = radius;

    // This is the hexes in the x axis tip to tip
    this.width_in_hexes = int(this.width / (2 * this.radius));
    // This is the
    this.height_in_hexes = int(this.height / (1 * (this.radius * sin(PI / 3)))) + 2;

    // Make centers
    this.centers = new Array(this.width_in_hexes);
    for (var i = 0; i < this.width_in_hexes; i++) {

      this.centers[i] = new Array(this.height_in_hexes);

      for (var j = 0; j < this.height_in_hexes; j++) {
        let short_radius = this.radius * sin(PI / 3);
        let x = (this.radius * 3 * i) + ((j & 1) * 1.5 * this.radius);
        let y = short_radius * 1 * j;

        this.centers[i][j] = { x, y };
      }
    }

    // Make Hexes
    this.hexes = new Array(this.width_in_hexes);
    for (var i = 0; i < this.width_in_hexes; i++) {

      this.hexes[i] = new Array(this.height_in_hexes);

      for (var j = 0; j < this.height_in_hexes; j++) {
        let { x, y } = this.centers[i][j];

        this.hexes[i][j] = new Hexagon(i, j, x, y, this.radius);
      }
    }

  }

  show() {
    for (var i = 0; i < this.width_in_hexes; i++) {
      for (var j = 0; j < this.height_in_hexes; j++) {
        let hex = this.hexes[i][j];
        hex.show()
      }
    }
  }

  make_bombs(bomb_count) {
    for (let i = 0; i < bomb_count; i++) {
      let x = int(floor(random(1, this.width_in_hexes - 1)))
      let y = int(floor(random(1, this.height_in_hexes - 1)))

      let hex = this.hexes[x][y]
      hex.make_bomb()
    }
  }

  count_bombs() {
    for (var i = 0; i < this.width_in_hexes; i++) {
      for (var j = 0; j < this.height_in_hexes; j++) {
        let hex = this.hexes[i][j];
        let neighbors = this.get_neighbors(hex)

        let count = 0
        for (let n of neighbors) {
          if (n.is_bomb) {
            count++
          }
        }

        hex.set_bomb_count(count)
      }
    }
  }

  coords_to_hex(x, y) {
    let dist = (x1, y1, x2, y2) => sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2));

    let min_hex = this.hexes[0][0];
    let min_dist = dist(x, y, min_hex.x, min_hex.y);

    for (var i = 0; i < this.width_in_hexes; i++) {
      for (var j = 0; j < this.height_in_hexes; j++) {
        let new_hex = this.hexes[i][j];

        let new_dist = dist(x, y, new_hex.x, new_hex.y);

        if (min_dist > new_dist) {
          min_dist = new_dist;
          min_hex = new_hex;
        }
      }
    }
    return min_hex;
  }

  get_neighbors(hex) {
    let i = hex.i;
    let j = hex.j;

    let neighbors = [];

    let jodd = j & 1;
    let jeven = (j & 1) ^ 1;

    let directions = [
      // east
      { i: i + jodd, j: j - 1 },
      { i: i + jodd, j: j + 1 },
      // west
      { i: i - jeven, j: j - 1 },
      { i: i - jeven, j: j + 1 },

      // north
      { i: i, j: j + 2 },
      // south
      { i: i, j: j - 2 },
    ]

    for (let d of directions) {
      let { i, j } = d
      let test_hex = this.get_hex_bounded(i, j)
      if (test_hex) {
        neighbors.push(test_hex)
      }
    }

    return neighbors;
  }

  get_hex_bounded(i, j) {
    if (
      i < 0 ||
      i >= this.width_in_hexes ||
      j < 0 ||
      j >= this.height_in_hexes
    ) {
      return undefined
    }

    return this.hexes[i][j]
  }
}

