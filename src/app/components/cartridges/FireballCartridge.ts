import fireballImage from '../../../assets/images/fireball.png'
import {ComponentWithPosition} from '../abstract/ComponentWithPosition'
import {CARTRIDGE_SIZE} from '../../static/game'

export class FireballCartridge extends ComponentWithPosition {
  private _cartridgeImage: HTMLImageElement

  private readonly _power = 20
  private readonly _speed = 5

  constructor(x: number, y: number) {

    super(x, y, CARTRIDGE_SIZE)
    this._cartridgeImage = new Image()
    this._cartridgeImage.src = fireballImage
  }

  move() {
    this._x += this._speed
  }

  draw() {
    this._gameConfigurator.context.drawImage(this._cartridgeImage, this._x, this._y - CARTRIDGE_SIZE / 2, this.width, this.height)
  }

  get power() {
    return this._power
  }
}
