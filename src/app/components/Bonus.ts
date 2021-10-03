import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Bonus extends AbstractComponentWithPosition {
  private _amount: number

  constructor(x: number, y: number, amount: number) {
    super(x, y, CELL_SIZE / 2);

    this._amount = amount
  }

  draw() {
    this._gameConfigurator.context.fillStyle = COLORS.bonusColor
    this._gameConfigurator.context.fillRect(this._x, this._y, this._width, this._height)
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
