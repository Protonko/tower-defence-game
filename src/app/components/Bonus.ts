import coinSprite from '../../assets/images/coins.png'
import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Bonus extends AbstractComponentWithPosition {
  private _amount: number
  private _coinSprite: HTMLImageElement
  private _frameX: number
  private _frameY: number
  private _minFrame: number
  private _maxFrame: number

  constructor(x: number, y: number, amount: number) {
    super(x, y, CELL_SIZE / 2);

    this._amount = amount
    this._coinSprite = new Image()
    this._coinSprite.src = coinSprite
    this._frameX = 0 // Sprite is vertical, therefore x always is 0
    this._frameY = 0
    this._minFrame = 0
    this._maxFrame = 3 // Sprite consists of 4 pictures
  }

  move() {
    this._frameY += 0

    // Slow down animation 10 times
    if (this._gameConfigurator.frame % 10 !== 0) return

    if (this._frameY < this._maxFrame) {
      this._frameY++
    } else {
      this._frameY = 0
    }
  }

  draw() {
    const imageWidth = 40
    const imageHeight = 44

    this._gameConfigurator.context.drawImage(
      this._coinSprite,
      this._frameX,
      this._frameY * imageHeight,
      imageWidth,
      imageHeight,
      this._x,
      this._y,
      this._width,
      this._height
    )

    this._gameConfigurator.context.fillStyle = COLORS.bonusTextColor
    this._gameConfigurator.context.font = createFontStyle(SIZES.bonusFontSize, FONT_FAMILY)
    this._gameConfigurator.context.textAlign = 'center'
    this._gameConfigurator.context.textBaseline = 'middle'
    this._gameConfigurator.context.fillText(this._amount.toString(), this._x + this._width / 2, this._y + this._height / 2)
  }

  get amount() {
    return this._amount
  }
}
