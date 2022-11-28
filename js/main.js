import config from './config'
import store from './store'
import Background from './gameObject/main/Background'
import Floor from './gameObject/main/Floor'
import Bird from './gameObject/main/Bird'
import Pipes from './gameObject/main/Pipes'
import Event from './gameObject/main/Event'
import ScoreText from './gameObject/main/ScoreText'

import ProloadScene from './scene/Preload'
const ctx = canvas.getContext('2d')
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    // 初始化
    this.init()
  }

  // 按比例视图，超出部分黑色遮罩层
  drawBlack() {
    ctx.save()
    ctx.fillStyle = '#000'
    if (config.disX > 0) {
      ctx.fillRect(0, 0, config.disX, config.windowHeight)
      ctx.fillRect(config.windowWidth - config.disX, 0, config.disX, config.windowHeight)
    } else if (config.disY > 0) {
      ctx.fillRect(0, 0, config.windowWidth, config.disY)
      ctx.fillRect(0, config.windowHeight - config.disY, config.windowWidth, config.disY)
    }
    ctx.restore()
  }

  init() {
    this.preloadScene = new ProloadScene(ctx)
    this.background = new Background(ctx)
    this.floor = new Floor(ctx, this.background)
    this.bird = new Bird(ctx, this.background)
    this.scoreText = new ScoreText(ctx)
    this.pipes = new Pipes(ctx, this.floor, this.scoreText)
    this.event = new Event(this)

    this.bindLoop = this.loop.bind(this)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  render() {
    if (store.scene === 'preload') {
      this.preload()
    } else if (store.scene === 'main') {
      this.rendMain()
    }
    
  }

  preload() {
    this.preloadScene.render()
  }

  rendMain(){
    this.background.draw()

    this.pipes.draw()
    this.floor.draw()
    this.bird.draw()

    this.scoreText.draw()

    this.drawBlack()

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

  loop() {
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
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
}