import ImageTexture from '../../../libs/my/ImageTexture'
import config from '../../config'


// const w = 2454
// const h = 647
const w = 975
const h = 650
const x = 0
const y = 0
export default class Background extends ImageTexture {
    speed = 0.5
    status = 'static'
    fromX = 0
    isStop = true
    constructor(ctx) {
        super(ctx, w, h, x, y, config.assets.background)
    }

    loadImage(imgSrc) {
        this.imgObj = new Image()
        this.imgObj.src = imgSrc
        this.imgObj.onload = () => {
            const canvas = wx.createCanvas()
            const canCtx = canvas.getContext('2d')
            canvas.height = this.h
            canvas.width = this.w * 3
            canCtx.drawImage(this.imgObj, 0, 0, this.w, this.h)
            canCtx.drawImage(this.imgObj, this.w, 0, this.w, this.h)
            canCtx.drawImage(this.imgObj, this.w * 2, 0, this.w, this.h)
            this.imgObj.src = canvas.toDataURL()
            this.imgObj.onload = () => {
                this.loading = false
            }
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

    restart() {
        this.fromX = 0
        this.start()
    }
}