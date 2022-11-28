import store from '../../store'
import config from '../../config'
import {
    compareVersion
} from '../../../utils/utils'
export default class Event {
    bird
    background
    floor
    scoreText
    constructor(game) {
        this.bird = game.bird
        this.background = game.background
        this.floor = game.floor
        this.scoreText = game.scoreText
        this.pipes = game.pipes
        this.game = game
        wx.onTouchStart((result) => {
            this.touchStart()
        })
    }

    touchStart() {
        if (!store.isGameStart) {
            this.game.restart()
        } else if (store.isGameOver) {
            this.openRewardedVideo()
            this.game.restart()
        } else if (!store.isGameOver && !store.isHit) {
            this.game.bird.status = 'fly'
        }
    }

    // 打开激励广告
    openRewardedVideo() {
        // const SDKVersion = config.deviceInfo.SDKVersion
        // if (compareVersion(SDKVersion, '2.0.4') >= 0) {
        //     console.log('open video')
        //     wx.createRewardedVideoAd({
        //         adUnitId: 1,
        //     })
        // }

    }
}