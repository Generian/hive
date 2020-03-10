import p5 from "p5/lib/p5.min";

import { Board } from './board.js';
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode } from './events.js';

// Game initialization
let board = new Board()

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
            board.highlightPlayableCells()
        }
    };

    p.mouseClicked = function() {
        console.log("click")
        switch (mode.action) {
            case "set":
                console.log("set");
                tiles.push(new Tile(getIndexByPosition(), mode.player));
                mode.player = mode.player === "white" ? "black" : "white";
                break;
            case "select":
                console.log("select");
                if (board.tileClicked()) {
                    board.updateTile(getPosIDByPosition(), "mode", "follow")
                    mode.action = "drop"
                };
                break;
            case "drop":
                    console.log("drop");
                    board.tiles.forEach((tile) => {
                        if (tile.mode === "follow") {
                            tile.coordinates = getIndexByPosition()
                            tile.mode = "static"
                        };
                    });
                    mode.action = "select"
                    break;
            case "other":
                console.log("other");
        }
    };
};

export const myP5 = new p5(sketch)