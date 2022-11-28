import ImageTexture from './ImageTexture'
import config from '../../js/config'

/**
 * 精灵 - 仅用于需要保持长宽比的游戏动画对象
 * w宽 h高 x横坐标 y纵坐标 imgSrc资源地址 n帧数 s动画速度
 */
export default class Sprite extends ImageTexture {
    isPlaying = false
    angle = 0 // 角度（度）
    t = 0 // 事件增量，用于确定动画帧
    n // 帧数
    s // 动画速度
    constructor(ctx, w, h, x, y, imgSrc, n = 1, s = 1) {
        super(ctx, w, h, x, y, imgSrc)

        this.n = n
        this.s = s
    }

    setAngle(val) {
        this.angle = val
    }

    play() {
        this.isPlaying = true
    }

    pause() {
        this.isPlaying = false
    }

    stop() {
        this.t = 0
        this.isPlaying = false
    }

    render() {
        if (!this.loading) {
            this.ctx.save()
            // 设定坐标原点
            this.ctx.translate(this.posX + .5 * this.w*config.ratio / this.n,
                this.posY + .5 * this.h*config.ratio)
            // 旋转角度
            this.ctx.rotate(this.angle * Math.PI / 180)
            this.ctx.scale(this.scaleX, this.scaleY)
            // 计算动画帧 [0,n-1]
            const animIdx = Math.floor(this.t / this.s) % this.n
            // 绘制
            this.ctx.drawImage(this.imgObj,
                this.w / this.n * animIdx,
                0,
                this.w / this.n,
                this.h,
                -.5 * this.w / this.n,
                -.5 * this.h,
                this.w / this.n,
                this.h)
            this.ctx.restore()
            // 事件增量
            if (this.isPlaying) {
                this.t++
                if (this.t === this.n * this.s) this.t = 0
            }
        }
    }
}