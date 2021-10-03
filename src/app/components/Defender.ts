import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {HEALTH} from '../static/defenders'
import {CELL_GAP, CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'
import {Cartridge} from './Cartridge'

// TODO: фабричный метод для защитников
export class Defender extends AbstractComponentWithPosition {
  private _health: number
  private _timer: number

  constructor(x: number, y: number) {
    super(x, y, CELL_SIZE - CELL_GAP * 2)

    this._health = HEALTH
    this._timer = 0
  }

  draw() {
    this._gameConfigurator.context.fillStyle = COLORS.defenderColor
    this._gameConfigurator.context.fillRect(this._x, this._y, this._width, this._height)
    this._gameConfigurator.context.fillStyle = 'gold'
    this._gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._gameConfigurator.context.fillText(Math.floor(this._health).toString(), this._x, this._y + CELL_SIZE / 2)
  }

  shoot(cartridges: Cartridge[]) {
    this._timer++;

    if (this._timer % 100 === 0) {
      cartridges.push(new Cartridge(this._x + CELL_SIZE, this._y + CELL_SIZE / 2));
    }
  }

  get health() {
    return this._health
  }

  set health(health: number) {
    this._health = health
  }
}
