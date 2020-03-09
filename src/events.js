export let mode = {player: "white", action: "select"}

export function determineMode() {
    return mode
}

export function mouseClicked() {
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
}