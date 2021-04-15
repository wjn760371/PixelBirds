const gameDom = document.getElementsByClassName('game')[0];
const gamewidth = parseFloat(getComputedStyle(document.querySelector('.game')).width)

class Pipe extends Rectangle{
    constructor(height, top, landSpeed, dom) {
        super(52, height, gamewidth, top, landSpeed, 0, dom);
    }

    onMove(){
        if (this.left < -this.width){
            //当水管移出左边框，则删掉
            this.dom.remove();
        }
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

class pipePare{
    constructor(landSpeed) {
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        this.upHeight = getRandom(this.minHeight, this.maxHeight);//上水管的高度
        const upDom = document.createElement('div');
        upDom.className = "pipe up";
        this.upPipe = new Pipe(this.upHeight, 0, landSpeed, upDom);

        const downDom = document.createElement('div');
        downDom.className = "pipe down";
        const downHeight = landTop - this.upHeight - this.spaceHeight;//下水管的高度
        const downTop = landTop - downHeight;//下水管距离顶部的距离
        this.downPipe = new Pipe(downHeight, downTop, landSpeed, downDom);

        gameDom.appendChild(downDom);
        gameDom.appendChild(upDom);
    }

    /**
     * 该柱子对是否已经移出了视野
     */
    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePareProducer{
    constructor(landSpeed) {
        this.speed = landSpeed
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }
    startProduce(){
        if (this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new pipePare(this.speed));
            //移除掉用不到的柱子
            for (let i = 0; i < this.pairs.length; i++){
                let pair = this.pairs[i];
                if(pair.useLess){
                    //没用的柱子对
                    this.pairs.splice(i, 1);
                }
            }
        }, this.tick)
    }

    stopProduce(){
        clearInterval(this.timer);
        this.timer = null;
    }
}
