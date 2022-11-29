import config from '../config'
import store from '../store'
import Background from '../gameObject/main/Background'
import Floor from '../gameObject/main/Floor'
import Bird from '../gameObject/main/Bird'
import Pipes from '../gameObject/main/Pipes'
import Event from '../gameObject/main/Event'
import ScoreText from '../gameObject/main/ScoreText'

export default class MainScene {
    ctx
    constructor(ctx, game, key = 'main') {
        this.ctx = ctx
        this.game = game
        this.key = key
    }

    start() {
        this.background = new Background(this.ctx)
        this.floor = new Floor(this.ctx, this.background)
        this.bird = new Bird(this.ctx, this.background)
        this.scoreText = new ScoreText(this.ctx)
        this.pipes = new Pipes(this.ctx, this.floor, this.scoreText)
        this.event = new Event(this)
    }

    render() {
        this.background.draw()

        this.pipes.draw()
        this.floor.draw()
        this.bird.draw()

        this.scoreText.draw()

        // 判断碰撞
        if (!store.isGameStart) { // 游戏未开始

        } else if (this.bird.posY + this.bird.height >= this.floor.posY) { // 碰到了地面
            this.background.stop()
            this.floor.stop()
            this.bird.stop()
            this.pipes.stop()
            store.isGameOver = true

        } else if (!store.isGameOver &&
            this.pipes.isCollisionAndScore(this.bird.posX + .5 * this.bird.width / 3,
                this.bird.posY + .5 * this.bird.height,
                .5 * this.bird.height)) {
            this.bird.status = 'drop'
            this.background.stop()
            this.floor.stop()
            this.pipes.stop()
            store.isHit = true
        }
    }

    restart() {
        this.background.restart()
        this.floor.restart()
        this.bird.restart()
        this.scoreText.restart()
        this.pipes.restart()
        store.isGameStart = true
        store.isGameOver = false
        store.isHit = false
    }

    destory() {

    }
}