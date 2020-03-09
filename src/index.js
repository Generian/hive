import { Board } from './board.js';
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, sytle } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode, mouseClicked } from './events.js';

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

console.log("test")