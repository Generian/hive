export let mode = {player: "white", action: "select"}

export function determineMode() {
    return mode
}

export function switchPlayer() {
    mode.player = mode.player === "white" ? "black" : "white";
    console.log("Players turn:", mode.player);
}