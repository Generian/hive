function setup() {
    createCanvas(vw, vh);
    background(220);

    
}

// Game initialization
let tiles = []
createTiles()

// const tile1 = new Tile({});
// const tile2 = new Tile(tile1, 3);

// tiles.push(tile1)
// tiles.push(tile2)


function draw() {
    // DEBUGGING - Draws the board tiles outlines and positions
    drawBoard()

    let gameOver = false;

    if (!gameOver) {
        // Update tiles
        tiles.forEach((tile) => {
            if (tile.mode === "follow") {
                tile.updatePos()
            }
        })

        // Draw all set tiles
        for (i = 0; i < tiles.length; i++) {
            tiles[i].draw();
        }

        // Draw tile highlights
        // highlightCell()
        highlightTile()
    }
}