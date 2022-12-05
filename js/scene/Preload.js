import config from '../config'
import store from '../store'
import Loading from '../gameObject/preload/Loading'
import MainScene from '../scene/Main'

export default class ProloadScene {
  cnt = 0
  loadSprite
  bindLoop
  aniId
  constructor(ctx, canvas, game, key = 'preload') {
    this.ctx = ctx
    this.canvas = canvas
    this.game = game
    this.key = key
    this.loadSprite = new Loading(ctx)
    this.start()
  }

  // 循环函数
  loop() {
    if (store.scene === this.key) {
      this.render()
      this.aniId = requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }
  }

  // 开启场景
  start() {
    // 预加载资源
    const assets = config.assets
    const total = Object.keys(assets).length
    for (var key in assets) {
      config.images[key] = new Image()
      config.images[key].src = assets[key]
      config.images[key].onload = () => {
        ++this.cnt
        this.loadSprite.update(this.cnt / total)
        // 判断是否全部加载完毕
        if (this.cnt === total) {
          let mainScene = new MainScene(this.ctx, this.canvas, this.game)
          store.scene = 'main'
          mainScene.start()
        }
      }
    }
    this.bindLoop = this.loop.bind(this)
    this.aniId = requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  render() {
      this.ctx.clearRect(0, 0, config.windowWidth, config.windowHeight)
    this.loadSprite.render()
      this.game.drawBlack()
  }
}