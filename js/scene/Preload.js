import config from '../config'
import store from '../store'
import Loading from '../gameObject/preload/Loading'

export default class ProloadScene {
  cnt = 0
  loadSprite
  constructor(ctx) {
    this.ctx = ctx
    this.loadSprite = new Loading(ctx)
    this.start()
  }

  start() {
    // 预加载资源
    const assets = config.assets
    for (var key in assets){
      config.images[key] = new Image()
      config.images[key].src = assets[key]
      config.images[key].onload = () => {
        this.cnt++
        // 判断是否全部加载完毕
        if (this.cnt === Object.keys(assets).length) {
          store.scene = 'main'
          console.log('toMain')
        }
      }
    }
  }

  render(){

  }
}