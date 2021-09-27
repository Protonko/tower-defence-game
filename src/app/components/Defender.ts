import {HEALTH} from '../static/defenders'
import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

// TODO: фабричный метод для защитников
export class Defender extends AbstractComponentWithPosition {
  private _shooting: boolean
  private _health: number
  private _timer: number
  private _projectiles = []

  constructor(x: number, y: number) {
    super(x, y, CELL_SIZE)

    this._shooting = false
    this._health = HEALTH
    this._timer = 0
    this._projectiles = []
  }

  draw() {
    this._gameConfigurator.context.fillStyle = COLORS.defenderColor
    this._gameConfigurator.context.fillRect(this._x, this._y, this._width, this._height)
    this._gameConfigurator.context.fillStyle = 'gold'
    this._gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._gameConfigurator.context.fillText(Math.floor(this._health).toString(), this._x, this._y + CELL_SIZE / 2)
  }

  get health() {
    return this._health
  }

  set health(health: number) {
    this._health = health
  }
}
