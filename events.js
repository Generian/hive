function createTiles() {
    const players = ["white", "black"]
    const num_tiles = 3

    players.forEach((player) => {
        for (j = 0; j < num_tiles; j++) {
            let i = player === "white" ? -5 : 5
            tiles.push(new Tile([i, j-1], player))
        };
    });
};

let mode = {player: "white", action: "select"}

function determineMode() {
    return mode
}

function mouseClicked() {
    console.log("click")
    switch (mode.action) {
        case "set":
            console.log("set");
            tiles.push(new Tile(getIndexByPosition(), mode.player));
            mode.player = mode.player === "white" ? "black" : "white";
            break;
        case "select":
            console.log("select");
            if (tileClicked()) {
                updateTile(getPosIDByPosition(), "mode", "follow")
                mode.action = "drop"
            };
            break;
        case "drop":
                console.log("drop");
                tiles.forEach((tile) => {
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
}