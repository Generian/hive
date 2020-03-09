import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode } from './events.js';

export class Tile {
    constructor(pos, type) {
        this.pos = pos;
        this.coordinates = [];
        this.type = type;
        this.playable = true;
        this.mode = "static";
        this.level = 1;   
    }

    // Adding a method to the constructor
    posID() {
        if (this.coordinates.length == 0) {
            return getPosIDByPosition(this.pos)
        } else {
            return getPosIDByIndex(this.coordinates)
        }
    }

    draw() {
        hexagon(coords[this.posID()].center, "", `tile_${this.type}`)
    }

    highlight() {
        hexagon(coords[this.posID()].center, "", "hover")
    }

    updatePos(pos = getIndexByPosition()) {
        this.coordinates = pos;
    }

    getNeighbors() {
        let neighbors = []
        if (this.coordinates != []) {
            const [i, j] = this.coordinates;
            for (let x = i - 1; x <= i + 1; x++) {
                for (let y = j - 1; y <= j + 1; y++) {
                    if (x-i != 0 || y-j != 0) {
                        if (x-i === 0 || y-j != j+1) {
                            neighbors.push([x, y])
                        }
                    }
                }
            }
        }
        return neighbors
    }
}
