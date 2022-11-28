import ImageTexture from '../../../libs/my/ImageTexture'
import config from '../../config'

const w = 300
const h = 30
const x = (config.GAME_WIDTH - w) / 2
const y = config.GAME_HEIGHT / 2 + h
/**
 * 加载进度条
 */
export default class Loading extends ImageTexture {
    constructor(ctx) {
        super(ctx, w, h, x, y)
    }
}

/**
 * 进度条背景
 */
class LoadBack extends ImageTexture {
    constructor() {
        super(ctx, w, h, x, y)
    }
}

/**
 * 进度条前景
 */
class LoadFront extends ImageTexture {
    constructor() {
        super(ctx, w, h, x, y)
    }

}

/**
 * 进度条文字
 */
const text_x = (config.GAME_WIDTH - w) / 2
const text_y = config.GAME_HEIGHT / 2 - 30
class LoadText extends ImageTexture {
    constructor() {
        super(ctx, 0, 0, text_x, text_y)
    }
}