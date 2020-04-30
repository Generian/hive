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
            if (tile.posID() === posID && tile.isPlayable()) {
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
            if ((tile.mode === "static" && tile.isPlayable()) || this.tilesOnBoard() === 1) {
                tile.getNeighborCells().forEach((index) => {
                    playableCells.push(getPosIDByIndex(index));
                });
            }
        });

        this.tiles.forEach((tile) => {
            // console.log(tile.coordinates, tile.mode, !tile.isPlayable(), !tile.inPlay);
            if ((tile.mode === "static" && !tile.isPlayable() && !tile.inPlay) && this.tilesOnBoard() != 1) {
                tile.getNeighborCells().forEach((index) => {
                    const i = playableCells.indexOf(getPosIDByIndex(index));
                    if (i > -1) {
                        playableCells.splice(i, 1);
                    }
                });
            };
        });

        this.tiles.forEach((tile) => {
            if (tile.mode === "static") {
                const index = playableCells.indexOf(tile.posID());
                if (index > -1) {
                    playableCells.splice(index, 1);
                }
            };
        });

        if (playableCells.length === 0) {
            playableCells.push(getPosIDByIndex([0, 0]));
        }

        return playableCells
    };

    highlightPlayableCells() {
        this.getPlayableCells().forEach((posID) => {
            const c = coords[posID].center;
            this.highlightCell(c,"","highlight");
        });
    };

    tilesOnBoard() {
        let counter = 0;
        this.tiles.forEach((tile) => {
            if (tile.mode === "static" && tile.coordinates.length > 0) {
                counter += 1
            };
        });
        return counter;
    }
};