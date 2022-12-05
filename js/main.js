import config from './config'
import store from './store'

import ProloadScene from './scene/Preload'
import MainScene from './scene/Main'

const ctx = canvas.getContext('2d')
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    wx.setPreferredFramesPerSecond(60)
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
    this.preloadScene = new ProloadScene(ctx, canvas, this)
  }


  preload() {
    this.preloadScene.render()
  }

  rendMain() {
    this.mainScene.render()
  }
}