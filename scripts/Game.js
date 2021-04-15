class Game{
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        //柱子对生成器
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 20;
        this.gameOver = false;
    }

    start(){
        if(this.timer){
            return;
        }
        if(this.gameOver){
            //重新开始游戏
            window.location.reload();
        }
        this.pipeProducer.startProduce();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);
            })
            if(this.isGameOver()){
                this.stop();
                this.gameOver = true;
            }
        }, this.tick)
    }

    /**
     * 判断两个矩形是否碰撞
     * @param rec1
     * @param rec2
     */
    isHit(rec1, rec2){
        //横向：看两个矩形中心点的横向距离，是否小于矩形宽度之和的一半
        //纵向：看两个矩形中心点的纵向距离，是否小于矩形高度之和的一半
        let centerX1 = rec1.left + rec1.width / 2;
        let centerY1 = rec1.top + rec1.height / 2;
        let centerX2 = rec2.left + rec2.width / 2;
        let centerY2 = rec2.top + rec2.height / 2;
        let disX = Math.abs(centerX1 - centerX2);
        let disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2){
            return true;
        }else{
            return false;
        }
    }

    isGameOver(){
        if(this.bird.top === this.bird.maxY){
            //鸟碰到了大地
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++){
            const pair = this.pipeProducer.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if(this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)){
                return true;
            }
        }
        return false;
    }

    stop(){
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }

    /**
     * 关联键盘事件
     */
    regEvent(){
        window.onkeydown = (e) => {
            console.log(e.key)
            if(e.key === "Enter"){
                if(this.timer){
                    this.stop();
                }else{
                    this.start();
                }
            }
            else if (e.key === " "){
                this.bird.jump();
            }
        }
    }
}

let g = new Game();
g.regEvent();