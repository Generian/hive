class Tile {
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
}
