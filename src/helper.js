import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, sytle } from './variables.js';
import { mode, determineMode, mouseClicked } from './events.js';

export function isEven(n) {
    if (n % 2 == 0) {
        return 0
    } else {
        return 1
    };
 }
 
 export function hexagon(pos, label = "", type = "board") {
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

export function getClosestCellCenter() {
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

export function getCenter(i, j) {
    let x = Math.round((centerX + i * r * 1.5) * 1000) / 1000
    let y = Math.round((centerY + j * planeHeight + isEven(i) * widthOffset) * 1000) / 1000
    return {"x": x, "y": y}
}

export function getPosIDByPosition(centerPos = getClosestCellCenter()) {
    return `${centerPos.x};${centerPos.y}`
}

export function getPosIDByIndex(index) {
    const i = index[0]
    const j = index[1]
    const cellCenter = getCenter(i, j);
    return `${cellCenter.x};${cellCenter.y}`
}

export function getIndexByPosition() {
    const posID =  getPosIDByPosition()
    return coords[posID].index
}

