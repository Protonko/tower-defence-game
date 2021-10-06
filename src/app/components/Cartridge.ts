import fireballImage from '../../assets/images/fireball.png'
import {ComponentWithPosition} from './abstract/ComponentWithPosition'
import {CARTRIDGE_SIZE} from '../static/game'
import {CARTRIDGE_POWER, CARTRIDGE_SPEED} from '../static/defenders'

export class Cartridge extends ComponentWithPosition {
  private readonly _power: number
  private readonly _speed: number
  private _cartridgeImage: HTMLImageElement

  constructor(x: number, y: number) {
    super(x, y, CARTRIDGE_SIZE)

    this._power = CARTRIDGE_POWER
    this._speed = CARTRIDGE_SPEED
    this._cartridgeImage = new Image()
    this._cartridgeImage.src = fireballImage
  }

  move() {
    this._x += this._speed
  }

  draw() {
    this._gameConfigurator.context.drawImage(this._cartridgeImage, this._x, this._y - CARTRIDGE_SIZE / 2, this.width, this.height)
  }
}
