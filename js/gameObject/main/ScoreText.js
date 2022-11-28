import ImageTexture from "../../../libs/my/ImageTexture"
import config from "../../config"

const x = 100
const y = 100
export default class ScoreText extends ImageTexture {
    ctx
    score = 0
    fontSize = 50

    constructor(ctx) {
        super(ctx, 0, 0, x, y)
        this.ctx = ctx
        this.fontSize*=config.ratio
    }

    draw() {
        this.ctx.save()
        this.ctx.font = `${this.fontSize}px serif`
        this.ctx.fillStyle = '#fff111'
        this.ctx.fillText(`Score:${this.score}`, this.posX, this.posY)
        this.ctx.restore()
    }

    addScore(s) {
        this.score += s
    }

    restart(){
        this.score = 0
    }
}