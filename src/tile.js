import { myP5 } from "./index.js";
import { board } from "./index.js";
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode } from './events.js';

export class Tile {
    constructor(pos, type) {
        this.pos = pos;
        this.coordinates = [];
        this.type = type;
        // this.playable = this.isPlayable();
        this.mode = "static";
        this.inPlay = false;
        this.level = 1;   
    }

    // Adding a method to the constructor
    posMode() {
        return this.coordinates.length === 0;
    }

    posID() {
        if (this.posMode()) {
            return getPosIDByPosition(this.pos);
        } else {
            return getPosIDByIndex(this.coordinates);
        }
    };

    position() {
        if (this.posMode()) {
            return this.pos;
        } else {
            return coords[getPosIDByIndex(this.coordinates)].center;
        }
    };

    draw() {
        hexagon(this.position(), "", `tile_${this.type}`)
    }

    highlight() {
        hexagon(coords[this.posID()].center, "", "hover")
    }

    updatePos(index = getIndexByPosition()) {
        const posID = getPosIDByPosition();
        if (this.mode === "follow") {
            const playableCells = board.getPlayableCells()
            // console.log("index:", index, "playable:", playableCells[0], playableCells.includes(posID))
            if (playableCells.includes(posID)) {
                this.coordinates = index;
            } else {
                this.coordinates = [];
                this.pos = {"x": myP5.mouseX, "y": myP5.mouseY};
            }
        } else {
            this.coordinates = index;
        }
    }

    getNeighborCells() {
        let neighbors = []
        if (this.coordinates != []) {
            const [i, j] = this.coordinates;
            for (let x = i - 1; x <= i + 1; x++) {
                for (let y = j - 1; y <= j + 1; y++) {
                    if (x-i != 0 || y-j != 0) {
                        if (i % 2 === 0) {
                            if (x-i === 0 || y-j != 1) {
                                neighbors.push([x, y])
                            }
                        } else {
                            if (x-i === 0 || y-j != -1) {
                                neighbors.push([x, y])
                            }
                        }

                    }
                }
            }
        }
        return neighbors
    }

    isPlayable() {
        return mode.player === this.type;
    }
}
