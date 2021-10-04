import {ComponentWithPosition} from './abstract/ComponentWithPosition'
import {CARTRIDGE_SIZE} from '../static/game'
import {CARTRIDGE_POWER, CARTRIDGE_SPEED} from '../static/defenders'
import {COLORS} from '../static/styles'

export class Cartridge extends ComponentWithPosition {
  private readonly _power: number
  private readonly _speed: number

  constructor(x: number, y: number) {
    super(x, y, CARTRIDGE_SIZE)

    this._power = CARTRIDGE_POWER
    this._speed = CARTRIDGE_SPEED
  }

  move() {
    this._x += this._speed
  }

  draw() {
    this._gameConfigurator.context.fillStyle = COLORS.cartridgeColor
    this._gameConfigurator.context.beginPath()
    this._gameConfigurator.context.arc(this._x, this._y, this._width, 0, Math.PI * 2)
    this._gameConfigurator.context.fill()
  }
}
