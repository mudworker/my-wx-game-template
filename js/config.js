const deviceInfo = wx.getSystemInfoSync()
const GAME_WIDTH = 1284
const GAME_HEIGHT = 750
/**
 * 保持横总比，就需要计算缩放系数、偏移距离
 */
const getRatio = () => {
    let c // 长宽系数 
    let dx = 0 // 扁屏下的x距离增量
    let dy = 0 // 方屏下的y距离增量
    if (deviceInfo.windowWidth / deviceInfo.windowHeight > GAME_WIDTH / GAME_HEIGHT) { // 扁屏
        c = deviceInfo.windowHeight / GAME_HEIGHT
        dx = (deviceInfo.windowWidth - c * GAME_WIDTH) / 2
    } else { // 方屏
        c = deviceInfo.windowWidth / GAME_WIDTH
        dy = (deviceInfo.windowHeight - c * GAME_HEIGHT) / 2
    }
    console.log(c, dx, dy, deviceInfo.devicePixelRatio)
    return [c, dx, dy]
}
const ratios = getRatio()

export default {
    deviceInfo: deviceInfo,
    pr: deviceInfo.devicePixelRatio,
    windowWidth: deviceInfo.windowWidth,
    windowHeight: deviceInfo.windowHeight,
    GAME_WIDTH: GAME_WIDTH,
    GAME_HEIGHT: GAME_HEIGHT,
    ratio: ratios[0], // 长宽系数
    disX: ratios[1], // 扁屏下的x距离增量
    disY: ratios[2], // 方屏下的y距离增量

    assets: {
        background: 'images/background.jpeg',
        floor: 'images/floor.png',
        bird: 'images/bird.png',
        pipe: 'images/pipe.png'
    },
    images:{}

}