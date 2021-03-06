import type {Enemy} from '@models/Enemy'
import devilSprite from '@assets/images/devil-sprite.png'
import {GameConfiguratorSingleton} from '@services/GameConfiguratorSingleton'
import {CELL_GAP, CELL_SIZE} from '@static/game'
import {COLORS, FONT_FAMILY, SIZES} from '@static/styles'
import {createFontStyle} from '@utils/createFontStyle'

export class DevilEnemy implements Enemy {
  private _gameConfigurator: GameConfiguratorSingleton
  private _context: CanvasRenderingContext2D
  private readonly _enemySprite: HTMLImageElement
  private _x: number
  private readonly _y: number
  private readonly _width: number
  private readonly _height: number
  private _movement: number
  private _frameX: number
  private _frameY: number
  private readonly _minFrame: number
  private readonly _maxFrame: number
  private _health = 150
  private readonly _reward = 75
  private _speed = 0.5
  private readonly _damage = 0.4

  constructor(y: number) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._context = this._gameConfigurator.context
    this._enemySprite = new Image()
    this._enemySprite.src = devilSprite
    this._x = this._gameConfigurator.canvasWidth
    this._y = y
    this._width = CELL_SIZE - CELL_GAP * 2
    this._height = CELL_SIZE - CELL_GAP * 2
    this._movement = this._speed
    this._frameX = 0
    this._frameY = 0 // Sprite is horizontal, therefore y always is 0
    this._minFrame = 0
    this._maxFrame = 3 // Sprite consists of 4 pictures
  }

  move() {
    this._x -= this._movement
    this._frameX += 0

    // Slow down animation 10 times
    if (this._gameConfigurator.frame % 10 !== 0) return

    if (this._frameX < this._maxFrame) {
      this._frameX++
    } else {
      this._frameX = 0
    }
  }

  draw() {
    const imageWidth = 64
    const imageHeight = 40

    this._frameY = this._movement ? 1 : 0 // first line in sprite - attack, second - move

    this._context.drawImage(
      this._enemySprite,
      this._frameX * imageWidth,
      this._frameY * imageHeight,
      imageWidth,
      imageHeight,
      this._x,
      this._y,
      this._width,
      this._height,
    )
    this._context.fillStyle = COLORS.textColor
    this._context.font = createFontStyle(SIZES.characterHealthSize, FONT_FAMILY)
    this._context.textAlign = 'start'
    this._context.textBaseline = 'middle'
    this._gameConfigurator.context.fillText(
      Math.floor(this._health).toString(),
      this._x + CELL_SIZE / 2,
      this.y - CELL_GAP,
    )
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get speed() {
    return this._speed
  }

  get reward() {
    return this._reward
  }

  get health() {
    return this._health
  }

  get damage() {
    return this._damage
  }

  set health(health: number) {
    this._health = health
  }

  set movement(movement: number) {
    this._movement = movement
  }
}
