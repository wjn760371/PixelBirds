const landDom = document.getElementsByClassName('land')[0];
const landStyles = getComputedStyle(landDom);
const landWidth = landStyles.width;
const landHeight = landStyles.height;
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle{
    constructor(landSpeed) {
        super(landWidth, landHeight, 0, landTop, landSpeed, 0, landDom);
    }

    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}
