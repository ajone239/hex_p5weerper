class Polygon {
  constructor(i, j, x, y, r, sides) {
    // Length to vertexes
    this.r = r;
    // GridCoords
    this.i = i;
    this.j = j;
    // center of polygon
    this.x = x;
    this.y = y;
    this.sides = sides;
  }

  show(rotation = 0) {
    const arc_width = (2 * PI) / this.sides;

    push();


    translate(this.x, this.y);
    rotate(rotation);

    beginShape();
    for (var i = 0; i < this.sides; i++) {
      const angle = arc_width * i;
      const x = (cos(angle) * this.r);
      const y = (sin(angle) * this.r);

      vertex(x, y);
    }
    endShape(CLOSE);


    pop();
  }
}

