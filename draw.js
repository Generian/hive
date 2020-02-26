// Viewport variables
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const centerX = vw/2;
const centerY = vh/2;

// Hexagon variables
const r = 70;
const planeHeight = Math.sqrt(3) * r
const widthOffset = Math.sqrt(3) * 0.5 * r

// Board variables
const width = 7
const height = 5
let coordinates = {}
let centers = []
for (i = -width; i <= width; i++) {
    for (j = -height; j <= height; j++) {
        coordinates[[i, j]] = getCenter(i, j)
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
    let x = centerX + i * r * 1.5
    let y = centerY + j * planeHeight + isEven(i) * widthOffset
    return {"x": x, "y": y}
}

function getClosestCellCenter() {
    const mousePos = {x: mouseX, y: mouseY}
    let closestCell = centers[0]

    function getDistance(point1, point2) {
        return Math.sqrt(Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2))
    }

    for (i = 0; i < centers.length; i++) {
        lastDistance = getDistance(closestCell, mousePos)
        newDistance = getDistance(centers[i], mousePos)
        if (newDistance < lastDistance) {
            closestCell = centers[i]
        }
    }

    return closestCell
}

function getIndexByPosition(centerPos) { 
    return Object.keys(coordinates).find(key => coordinates[key] === centerPos); 
} 

// Drawing actual board stuff

function drawBoard() {
    for (let center in coordinates) {
        hexagon(coordinates[center], `${center}`)
    }
};

function highlightCell() {
    hexagon(getClosestCellCenter(),"","hover")
};