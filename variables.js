// Viewport variables
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const centerX = vw/2;
const centerY = vh/2;

// Hexagon variables
const r = 50;
const planeHeight = r * Math.sqrt(3);
const widthOffset = r * Math.sqrt(3) * 0.5;
// Board variables
const width_abs = 10;
const height_abs = 10;
const width = 5;
const height = 2;

const coords = {};
const centers = [];
for (let i = -width_abs; i <= width_abs; i++) {
    for (let j = -height_abs; j <= height_abs; j++) {
        const cellCenter = getCenter(i, j);
        const cellIndex = [i, j];
        const posID = `${cellCenter.x};${cellCenter.y}`
        const isOnBoard = Math.abs(i) <= width && Math.abs(j) <= height ? true : false
        coords[posID] = {center: cellCenter, index: cellIndex, onBoard: isOnBoard}
    }
};
for (let posID in coords) {
    centers.push(coords[posID].center)
};

// Draw style
const style = {
    background: {
        fillColor: 'rgba(255, 255, 255, 1)',
        strokeColor: 'rgba(0, 0, 0, 0.02)',
        strokeWeight: 1,
        textSize: 32,
        textColor: 'rgba(200, 200, 200, 0.3)'
    },
    board: {
        fillColor: 'rgba(255, 255, 255, 1)',
        strokeColor: 'rgba(0, 0, 0, 0.05)',
        strokeWeight: 1,
        textSize: 32,
        textColor: 'rgba(200, 200, 200, 0.3)'
    },
    hover: {
        fillColor: 'rgba(200, 200, 200, 0.5)',
        strokeColor: 'rgba(0, 0, 0, 0.8)',
        strokeWeight: 3,
        textSize: 32,
        textColor: 'rgba(200, 200, 200, 0.3)'
    },
    tile_white: {
        fillColor: 'rgba(200, 200, 200, 0.5)',
        strokeColor: 'rgba(150, 150, 150, 1)',
        strokeWeight: 3,
        textSize: 32,
        textColor: 'rgba(200, 200, 200, 0.3)'
    },
    tile_black: {
        fillColor: 'rgba(100, 100, 100, 0.5)',
        strokeColor: 'rgba(25, 25, 25, 1)',
        strokeWeight: 3,
        textSize: 32,
        textColor: 'rgba(200, 200, 200, 0.3)'
    }
};