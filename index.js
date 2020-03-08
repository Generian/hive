function setup() {
    createCanvas(vw, vh);
    background(220);

    
}

// Game initialization
let board = new Board()

function draw() {
    // DEBUGGING - Draws the board tiles outlines and positions
    board.drawBoard();

    let gameOver = false;

    if (!gameOver) {
        // Update tiles
        board.updateTiles();

        // Draw all set tiles
        board.drawTiles();

        // Draw tile highlights
        // board.highlightCell()
        board.highlightTile()
    }
}