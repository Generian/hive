const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

function hexagon(x, y) {
    const radius = 70;
    let angle = TWO_PI / 6;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}

class Tile {
    constructor(neighbor, pos) {
        console.log(neighbor)
        if (neighbor === {}) {
            this.neighbors = [,,,,,];
            this.posX = vw/2;
            this.posY = vh/2;
        } else {
            this.neighbors = [,,,,,];
            this.neighbors[pos] = neighbor;
            this.posX = vw/3;
            this.posY = vh/3;
        }
        
        
        
    }

    // Adding a method to the constructor
    draw() {
        hexagon(this.posX, this.posY)
    }
}


function setup() {
    createCanvas(vw, vh);
    background(100);
}

let tiles = []

const tile1 = new Tile({});
const tile2 = new Tile(tile1, 3);

tiles.push(tile1)
tiles.push(tile2)

function draw() {
    for (i = 0; i < tiles.length; i++) {
        tiles[i].draw();
    }
}