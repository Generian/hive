class Tile {
    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type
        this.mode = "static"       
    }

    // Adding a method to the constructor
    draw() {
        hexagon(coordinates[this.coordinates].pos, "", `tile_${this.type}`)
    }

    highlight() {
        hexagon(coordinates[this.coordinates].pos, "", "hover")
    }

    posID() {
        return coordinates[this.coordinates].posID
    }

    updatePos(pos = getIndexByPosition()) {
        this.coordinates = pos;
    }
}