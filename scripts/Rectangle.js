class Rectangle{
    //矩形类需要传入width, height, left, top, xSpeed, ySpeed, DOM
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    /**
     * 用于实时更新dom元素的样式及位置
     * @param width
     * @param height
     * @param left
     * @param top
     * @constructor
     */
    render(width, height, left, top){
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    /**
     * 通过一个定时器来使矩形产生运动
     * @param duration 传入的运动时间
     */
    move(duration){
        const disX = this.xSpeed * duration;//横向移动的距离
        const disY = this.ySpeed * duration;//纵向移动的距离
        this.left = this.left + disX;
        this.top = this.top + disY;

        //判断实例对象中是否有onMove方法
        if(this.onMove){
            //每次移动后，渲染前，均会调用该方法
            this.onMove();
        }

        this.render();
    }
}