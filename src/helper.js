import {myP5} from "./index.js";
import { vw, vh, centerX, centerY, r, planeHeight, widthOffset, width_abs, height_abs, width, height, coords, centers, style } from './variables.js';
import { mode, determineMode } from './events.js';


export function isEven(n) {
    if (n % 2 == 0) {
        return 0
    } else {
        return 1
    };
 }
 
 export function hexagon(pos, label = "", type = "board") {
    const s = style[type]
    let angle = Math.PI / 3;
    myP5.fill(s.fillColor);
    myP5.stroke(s.strokeColor);
    myP5.strokeWeight(s.strokeWeight);
    myP5.beginShape();
    for (let a = 0; a < (2 * Math.PI); a += angle) {
      let sx = pos.x + Math.cos(a) * r;
      let sy = pos.y + Math.sin(a) * r;
      myP5.vertex(sx, sy);
    }
    myP5.endShape(myP5.CLOSE);
    myP5.textSize(s.textSize);
    myP5.textAlign(myP5.CENTER, myP5.CENTER);
    myP5.fill(s.textColor);
    myP5.noStroke();
    myP5.text(label, pos.x , pos.y);
};

export function getClosestCellCenter() {
    const mousePos = {x: myP5.mouseX, y: myP5.mouseY}
    let closestCellPos = centers[0]

    function getDistance(point1, point2) {
        return Math.sqrt(Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2))
    }

    for (let i = 0; i < centers.length; i++) {
        const lastDistance = getDistance(closestCellPos, mousePos)
        const newDistance = getDistance(centers[i], mousePos)
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

