// import p5 from "p5/lib/p5.min";

import { Board } from './board.js';
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode, mouseClicked } from './events.js';

// Game initialization
let board = new Board()

// function setup() {
//     createCanvas(vw, vh);
//     background(220);
// }

// function draw() {
//     // DEBUGGING - Draws the board tiles outlines and positions
//     board.drawBoard();

//     let gameOver = false;

//     if (!gameOver) {
//         // Update tiles
//         board.updateTiles();

//         // Draw all set tiles
//         board.drawTiles();

//         // Draw tile highlights
//         // board.highlightCell()
//         board.highlightTile()
//     }
// }

const containerElement = document.getElementById('p5-container');

const sketch = (p) => {

    p.setup = function() {
        p.createCanvas(vw, vh);
        p.background(220);
    };

    p.draw = function() {
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
};

new p5(sketch, containerElement)