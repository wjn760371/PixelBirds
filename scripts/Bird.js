const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
const maxY = parseFloat(getComputedStyle(document.querySelector('.game')).height) - parseFloat((getComputedStyle(document.querySelector('.land')).height)) - parseFloat((getComputedStyle(document.querySelector('.bird')).height));


class Bird extends Rectangle{
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxY = maxY;
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }

    startSwing(){
        //防止反复煽动
        if (this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus ++;
            if (this.swingStatus === 4){
                this.swingStatus = 1;
            }
            this.render();
        }, 200)
    }

    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }

    render(){
        super.render(); //通过调用父类的render方法来渲染位置
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration){
        super.move(duration);//调用父类方法
        this.ySpeed += this.g * duration;
    }

    onMove(){
        //控制坐标范围
        if(this.top < 0){
            this.top = 0;
        }
        else if(this.top > this.maxY){
            this.top = this.maxY;
        }
    }

    //向上跳跃，给一个向上的速度
    jump(){
        this.ySpeed = -380;
    }
}
