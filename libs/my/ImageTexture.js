import config from '../../js/config'

/**
 * 纹理 - 静态图片资源
 */
export default class ImageTexture {
    ctx
    w // 原始宽度
    h // 原始高度
    x // 原始横坐标
    y // 原始纵坐标
    posX // 作图横坐标
    posY // 作图纵坐标
    scaleX = 1 // 缩放比X
    scaleY = 1 // 缩放比y
    width // 宽度
    height // 高度
    imgObj

    constructor(ctx, w, h, x, y, imgName = null) {
        this.ctx = ctx
        this.w = w
        this.h = h
        this.x = x
        this.y = y

        this.scaleX = config.ratio
        this.scaleY = config.ratio
        // 计算位置（乘以系数，加上偏移增量）
        this.posX = this.x * config.ratio + config.disX
        this.posY = this.y * config.ratio + config.disY
        this.width = this.w * this.scaleX
        this.height = this.h * this.scaleY
        if (imgName) {
            this.imgObj = config.images[imgName]
        }
    }

    setScale(x, y) {
        this.scaleX = config.ratio * x
        this.scaleY = config.ratio * y
        this.width = this.w * this.scaleX
        this.height = this.h * this.scaleY
    }

    render() {
        this.ctx.save()
        // 设定坐标原点
        this.ctx.translate(this.posX, this.posY) // 以本物体左上角为缩放原点
        this.ctx.scale(this.scaleX, this.scaleY)
        this.ctx.drawImage(this.imgObj, 0, 0, this.w, this.h, 0, 0, this.w, this.h)
        this.ctx.restore()
    }
}