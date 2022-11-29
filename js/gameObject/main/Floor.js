import ImageTexture from "../../../libs/my/ImageTexture"
import config from '../../config'


const w = 37.5 // 优化：可被速度整除，不然会有卡顿
const h = 128
const x = 0
export default class Floor extends ImageTexture {
    status = 'static'
    fromX = 0
    speed = 2.5
    isStop = true
    loading = false
    constructor(ctx, bg) {
        const y = bg.h + bg.y
        super(ctx, w, h, x, y, 'floor')
        this.bg = bg
        this.loadImage()
    }

    loadImage() {
        this.n = Math.ceil(config.GAME_WIDTH / w) + 1
        const canvas = wx.createCanvas()
            const canCtx = canvas.getContext('2d')
            canvas.height = this.h
            canvas.width = this.w * this.n * 2
            for (let i = 0; i <= this.n; i++) {
                canCtx.drawImage(this.imgObj, this.w * i, 0, this.w, this.h)
            }
            this.imgObj.src = canvas.toDataURL()
            this.imgObj.onload = () => {
                this.loading = false
            }
    }

    draw() {
        if (!this.loading) {
            if (typeof this[this.status] === 'function') {
                this[this.status]()
            }
        }
    }

    static() {
        this.ctx.save()
        // 设定坐标原点
        this.ctx.translate(this.posX, this.posY) // 以本物体左上角为缩放原点
        this.ctx.scale(this.scaleX, this.scaleY)
        this.ctx.drawImage(this.imgObj, parseInt(this.fromX), 0, config.GAME_WIDTH, this.h, 0, 0, config.GAME_WIDTH, this.h)
        this.ctx.restore()
        this.interval()
    }

    interval() {
        if (!this.isStop) {
            this.fromX += this.speed
            if (this.fromX >= this.w) {
                this.fromX = 0
            }
        }
    }

    start() {
        this.isStop = false
    }

    stop() {
        this.isStop = true
    }

    restart(){
        this.fromX = 0
        this.speed = 2.5
        this.start()
    }
}