import config from '../config'
import store from '../store'
import Loading from '../gameObject/preload/Loading'

export default class ProloadScene {
  cnt = 0
  loadSprite
  constructor(ctx, game) {
    this.ctx = ctx
    this.game = game
    this.loadSprite = new Loading(ctx)
    this.start()
  }

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
          this.game.mainScene.start()
          setTimeout(() => {
            store.scene = 'main'
            console.log('toMain')
          }, 1000)
        }
      }
    }
  }

  render() {
    this.loadSprite.render()
  }
}