import Sprite from '../../../libs/my/Sprite'
import config from '../../config'

const w = 276
const h = 64
const x = 500
const y = 300
const n = 3
const s = 3
export default class Bird extends Sprite {
    background
    status = 'static'
    angle = 0 // 角度（-45度到90度）
    angleSpeed = 4 // 角度旋转速度
    gravity = 0.5 // 重力（向下的位移加速度）
    downSpeed = 0 // 向下的位移速度
    upSpeed = 7 // 向上飞的匀速度
    flyTime = 200 // 飞行持续事件
    flyTimeOut = null // 飞行定时器
    oraHeight // 原始高度
    constructor(ctx, background) {
        super(ctx, w, h, x, y, config.assets.bird, n, s)
        this.oraHeight = this.posY
        this.gravity *= config.ratio
        this.upSpeed *= config.ratio
        this.background = background
        this.play()
    }

    draw() {
        if (!this.loading) {
            if (typeof this[this.status] === 'function') {
                this[this.status]()
            }
        }
    }

    static() {
        this.downSpeed = 0
        this.render()
    }

    fly() {
        // 计算旋转角度
        this.angle = this.angle > 0 ? 0 : this.angle
        this.angle = (this.angle - this.angleSpeed <= -60) ? -60 : (this.angle - this.angleSpeed)
        this.setAngle(this.angle)
        // 计算位移
        this.downSpeed = 0
        this.posY -= this.upSpeed
        // 判断碰撞到顶部
        if (this.posY <= this.background.posY + this.upSpeed) {
            this.posY = this.background.posY + this.upSpeed
        }
        this.render()
        if (!this.flyTimeOut) {
            this.flyTimeOut = setTimeout(() => {
                this.status = 'drop'
                clearTimeout(this.flyTimeOut)
                this.flyTimeOut = null
            }, this.flyTime)
        }
    }

    drop() {
        // 计算旋转角度
        this.angle = (this.angle + this.angleSpeed >= 90) ? 90 : (this.angle + this.angleSpeed)
        this.setAngle(this.angle)
        // 计算位移
        this.downSpeed += this.gravity
        this.posY += this.downSpeed
        this.render()
    }

    // 撞墙坠落
    fall() {
        this.status = 'drop'
        this.pause()
    }

    stop() {
        this.status = 'static'
        this.pause()
    }

    restart(){
        this.angle = 0
        this.downSpeed = 0
        this.posY = this.oraHeight
        this.status = 'drop'
    }

}