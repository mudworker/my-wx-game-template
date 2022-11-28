import ImageTexture from "../../../libs/my/ImageTexture"
import config from '../../config'


/**
 * 管道集合
 */
export default class Pipes {
    floor
    scoreText
    gap = 250 // 上下水管间距
    distance = 50 // 上下极限距离
    pipeDelay = 3000 // 出现水管的事件间隔
    pipeGroup = []
    interval = null
    constructor(ctx, floor, scoreText) {
        this.ctx = ctx
        this.floor = floor
        this.scoreText = scoreText
        this.imgObj = new Image()
        this.imgObj.src = config.assets.pipe

        this.imgObj.onload = () => {
            this.loading = false
        }
    }

    start() {
        this.addPipes()
        this.interval = window.setInterval(this.addPipes.bind(this), this.pipeDelay)
    }

    addPipes() {
        // 计算最上方最下方极限值
        let max = this.floor.y - this.gap - this.distance
        let position = Math.random() * (max - this.distance) + this.distance // (this.distance,max]随机数
        // let position = this.distance
        // let position = max
        // 上管道y坐标
        let topY = position - h
        // 下管道y坐标
        let bottomY = position + this.gap
        this.addOneGroup(config.GAME_WIDTH, topY, bottomY)
    }

    addOneGroup(x, y1, y2) {
        let top = new Pip(this.ctx, x, y1, 1, this.imgObj)
        let Bottom = new Pip(this.ctx, x, y2, 2, this.imgObj)
        if (this.pipeGroup.length >= 8) { // 数组最多存5组，多余从头部的销毁
            this.pipeGroup.splice(0, 2)
        }
        this.pipeGroup.push(top)
        this.pipeGroup.push(Bottom)
    }

    draw() {
        for (let i = 0; i < this.pipeGroup.length; i++) {
            this.pipeGroup[i].draw()
        }
    }

    isCollisionAndScore(x, y, r) {
        for (let i = 0; i < this.pipeGroup.length; i++) {
            let pipe = this.pipeGroup[i]
            // 判断碰撞
            if (pipe.isCollision(x, y, r)) {
                return true
            }
            // 分数查验
            if (pipe.isScore === false && pipe.posX + pipe.width <= (x - r) && pipe.type === 1) {
                this.scoreText.addScore(1)
                pipe.isScore = true
            }
        }
        return false
    }


    stop() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        for (let i = 0; i < this.pipeGroup.length; i++) {
            this.interval = null
            this.pipeGroup[i].stop()
        }
    }

    restart() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.pipeGroup = []
        this.start()
    }
}

/**
 * 单个管道 type：1上 2下
 */
const w = 138
const h = 793

class Pip extends ImageTexture {
    speed = 2.5 // 速度
    type
    imgObj
    isScore = false
    isStop = false
    constructor(ctx, x, y, type, imgObj) {
        super(ctx, w, h, x, y)
        this.type = type
        this.imgObj = imgObj
        this.speed *= config.ratio
    }
    loadImage() {
        this.loading = false
    }

    draw() {
        if (!this.loading) {
            if (!this.isStop) {
                this.posX -= this.speed
            }
            if (this.type === 1) {
                this.ctx.save()
                this.ctx.translate(this.posX + .5 * this.width, this.posY + .5 * this.height)
                this.ctx.scale(this.scaleX, -this.scaleY) //左右镜像翻转
                this.ctx.drawImage(this.imgObj, 0, 0, this.w, this.h, -.5 * this.w, -.5 * this.h, this.w, this.h)
                this.ctx.restore()
            } else {
                this.render()
            }
        }
    }

    // 碰撞检测
    isCollision(x, y, r) {
        const top = this.posY - r
        const bottom = this.posY + this.height + r
        const left = this.posX - r
        const right = this.posX + this.width + r
        if (y >= top && y <= bottom && x >= left && x <= right) {
            return true
        }
        return false
    }

    stop() {
        this.isStop = true
    }

}