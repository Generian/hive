function setup() {
    createCanvas(vw, vh);
    background(255);
}

let tiles = []

// const tile1 = new Tile({});
// const tile2 = new Tile(tile1, 3);

// tiles.push(tile1)
// tiles.push(tile2)

function isEven(n) {
    if (n % 2 == 0) {
        return 0
    } else {
        return 1
    };
 }

function draw() {
    // DEBUGGING - Draws the board tiles outlines and positions
    drawBoard()
    highlightCell()
    //console.log(getClosestCellCenter(), getIndexByPosition({x: 1270, y: 699.231}))

    // Draw all set tiles
    // for (i = 0; i < tiles.length; i++) {
    //     tiles[i].draw();
    // }

    // Draw tile highlights
    

}