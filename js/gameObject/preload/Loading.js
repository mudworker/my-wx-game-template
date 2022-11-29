import ImageTexture from '../../../libs/my/ImageTexture'
import config from '../../config'

const w = 300
const h = 30
const x = (config.GAME_WIDTH - w) / 2
const y = config.GAME_HEIGHT / 2 + h
/**
 * 加载进度条
 */
export default class Loading {
    constructor(ctx) {
        this.back = new LoadBack(ctx)
        this.front = new LoadFront(ctx)
        this.text = new LoadText(ctx)
    }

    update(percent) {
        this.front.setW(percent)
    }

    render() {
        this.back.render()
        this.front.render()
        this.text.render()
    }
}

/**
 * 进度条背景
 */
class LoadBack extends ImageTexture {
    fillColor = '#fff111'
    constructor(ctx) {
        super(ctx, w, h, x, y)
    }
    render() {
        this.ctx.save()
        this.ctx.fillStyle = this.fillColor
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.ctx.restore()
    }

}

/**
 * 进度条前景
 */
class LoadFront extends ImageTexture {
    fillColor = 'green'
    wd = 0
    constructor(ctx) {
        super(ctx, w, h, x, y)
    }

    setW(percent) {
        this.wd = this.width * percent
    }

    render() {
        this.ctx.save()
        this.ctx.fillStyle = this.fillColor
        this.ctx.fillRect(this.posX, this.posY, this.wd, this.height)
        this.ctx.restore()
    }

}

/**
 * 进度条文字
 */
const text_x = (config.GAME_WIDTH - w) / 2
const text_y = config.GAME_HEIGHT / 2 - 30
class LoadText extends ImageTexture {
    fontSize = 36
    color = '#fff111'
    constructor(ctx) {
        super(ctx, 0, 0, text_x, text_y)
        this.fontSize *= config.ratio
    }

    render() {
        this.ctx.save()
        this.ctx.font = `${this.fontSize}px serif`
        this.ctx.fillStyle = this.color
        this.ctx.fillText(`loading...`, this.posX, this.posY)
        this.ctx.restore()
    }
}