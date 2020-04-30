import p5 from "p5/lib/p5.min";

import { Board } from './board.js';
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode, switchPlayer } from './events.js';

// Game initialization
export let board = new Board()

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
                switchPlayer()
                break;
            case "select":
                console.log("select");
                if (board.tileClicked()) {
                    board.tiles.forEach((tile) => {
                        if (tile.type === mode.player && tile.isPlayable()) {
                            if (tile.posID() == getPosIDByPosition()) {
                                tile.mode = "follow";
                                tile.inPlay = true;
                                mode.action = "drop"
                            }
                        };
                    });  
                };
                break;
            case "drop":
                    console.log("drop");
                    board.tiles.forEach((tile) => {
                        if (tile.mode === "follow") {
                            const posID = getPosIDByPosition()
                            if (board.getPlayableCells().includes(posID)) {
                                tile.coordinates = getIndexByPosition();
                                tile.mode = "static";
                                tile.inPlay = false;
                            }
                        };
                    });
                    mode.action = "select"
                    switchPlayer()
                    break;
            case "other":
                console.log("other");
        }
    };
};

export const myP5 = new p5(sketch)