class Hexagon extends Polygon {
  constructor(i, j, x, y, r) {
    super(i, j, x, y, r, 6);

    this.is_show = false;
    this.is_flag = false;
    this.is_bomb = false;

    this.bomb_count = 0;
  }

  show(rotation = 0) {
    push();

    if (!this.is_show) {
      if (this.is_flag) {
        fill(0, 100, 0);
      } else {
        fill(200)
      }
    } else {
      if (this.is_bomb) {
        fill(10, 0, 0);
      } else {
        fill(100)
      }
    }

    super.show(rotation);

    if (this.is_show) {
      if (this.is_bomb) {
        fill(100, 0, 0)
        ellipse(this.x, this.y, this.r)
      } else {
        fill(0)
        text(`${this.bomb_count}`, this.x - (this.r / 2), this.y)
      }
    }

    pop();
  }

  unhide() {
    this.is_show = true
  }

  flag() {
    this.is_flag = true
  }

  make_bomb() {
    this.is_bomb = true
  }

  set_bomb_count(bomb_count) {
    this.bomb_count = bomb_count
  }
}

