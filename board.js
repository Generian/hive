// Viewport variables
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const centerX = vw/2;
const centerY = vh/2;

// Hexagon variables
const r = 50;
const planeHeight = Math.sqrt(3) * r
const widthOffset = Math.sqrt(3) * 0.5 * r

// Board variables
const width = 7
const height = 5
let coordinates = {}
let centers = []
for (i = -width; i <= width; i++) {
    for (j = -height; j <= height; j++) {
        p = getCenter(i, j)
        coordinates[[i, j]] = {pos: p, posID: `${p.x}-${p.y}`}
        centers.push(getCenter(i, j))
    }
}

// Helper functions

function hexagon(pos, label = "", type = "board") {
    const s = style[type]
    let angle = TWO_PI / 6;
    fill(s.fillColor);
    stroke(s.strokeColor);
    strokeWeight(s.strokeWeight);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = pos.x + cos(a) * r;
      let sy = pos.y + sin(a) * r;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    textSize(s.textSize);
    textAlign(CENTER, CENTER);
    fill(s.textColor);
    noStroke();
    text(label, pos.x , pos.y);
};

function getCenter(i, j) {
    let x = Math.round((centerX + i * r * 1.5) * 1000) / 1000
    let y = Math.round((centerY + j * planeHeight + isEven(i) * widthOffset) * 1000) / 1000
    return {"x": x, "y": y}
}

function getClosestCellCenter() {
    const mousePos = {x: mouseX, y: mouseY}
    let closestCellPos = centers[0]

    function getDistance(point1, point2) {
        return Math.sqrt(Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2))
    }

    for (i = 0; i < centers.length; i++) {
        lastDistance = getDistance(closestCellPos, mousePos)
        newDistance = getDistance(centers[i], mousePos)
        if (newDistance < lastDistance) {
            closestCellPos = centers[i]
        }
    }

    return closestCellPos
}

function getPosIDByPosition() {
    const centerPos = getClosestCellCenter()
    return `${centerPos.x}-${centerPos.y}`
}

function getIndexByPosition() {
    const posID =  getPosIDByPosition()
    return Object.keys(coordinates).find(key => coordinates[key].posID === posID); 
}

// Drawing actual board stuff

function drawBoard() {
    for (let c in coordinates) {
        hexagon(coordinates[c].pos, `${c}`)
    }
};

function highlightCell() {
    hexagon(getClosestCellCenter(),"","hover")
};

function highlightTile() {
    const posID = getPosIDByPosition();
    tiles.forEach((tile) => {
        if (tile.posID() === posID) {
            tile.highlight()
        };
    });
};

function tileClicked() {
    const posID = getPosIDByPosition();
    let tileClicked = false;
    tiles.forEach((tile) => {
        if (tile.posID() === posID) {
            tileClicked = true;
        };
    });
    
    return tileClicked;
}

function updateTile(tilePosID, attr, val) {
    tiles.forEach((tile) => {
        if (tile.posID() === tilePosID) {
            tile[attr] = val
        };
    });
}