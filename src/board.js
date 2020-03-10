import { Tile } from './tile.js';
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { isEven, hexagon, getClosestCellCenter, getCenter, getPosIDByPosition, getPosIDByIndex, getIndexByPosition } from './helper.js';
import { mode, determineMode } from './events.js';

export class Board {
    constructor() {
        this.tiles = this.createTiles()

    };

    createTiles() {
        let tiles = []

        const players = ["white", "black"]
        const num_tiles = 3
    
        players.forEach((player) => {
            for (let j = 0; j < num_tiles; j++) {
                let i = player === "white" ? -7 : 7
                tiles.push(new Tile(getCenter(i, j-1), player))
            };
        });

        return tiles
    };

    drawBoard() {
        for (let c in coords) {
            hexagon(coords[c].center, "", "background");
            if (coords[c].onBoard) {
                hexagon(coords[c].center, `${coords[c].index}`, "board");
            };     
        };
    };

    drawTiles() {
        this.tiles.forEach((tile) => {
            if (tile.level === 1) {
                tile.draw();
            }
        })
        this.tiles.forEach((tile) => {
            if (tile.level === 2) {
                tile.draw();
            }
        })
    };

    updateTiles() {
        this.tiles.forEach((tile) => {
            if (tile.mode === "follow") {
                tile.updatePos()
            }
        })
    };

    highlightCell(center = getClosestCellCenter(), text = "", style = "hover") {
        hexagon(center, text, style)
    };

    highlightTile() {
        const posID = getPosIDByPosition();
        this.tiles.forEach((tile) => {
            if (tile.posID() === posID) {
                tile.highlight()
            };
        });
    };

    mouseOnBoard() {
        return coords[getPosIDByPosition()].onBoard
    };

    tileClicked() {
        const posID = getPosIDByPosition();
        let tileClicked = false;
        this.tiles.forEach((tile) => {
            if (tile.posID() === posID) {
                tileClicked = true;
            };
        });
        
        return tileClicked;
    };

    updateTile(tilePosID, attr, val) {
        this.tiles.forEach((tile) => {
            if (tile.posID() === tilePosID) {
                tile[attr] = val
            };
        });
    };

    getPlayableCells() {
        let playableCells = [];
        this.tiles.forEach((tile) => {
            tile.getNeighborCells().forEach((index) => {
                playableCells.push(index);
            });
        });

        return playableCells
    };

    highlightPlayableCells() {
        this.getPlayableCells().forEach((index) => {
            const posID = getPosIDByIndex(index);
            const c = coords[posID].center;
            this.highlightCell(c,"","highlight");
        });
    };
};