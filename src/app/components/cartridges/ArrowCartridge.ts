import type {Cartridge} from '@models/Cartridge'
import arrowCartridge from '@assets/images/arrow.png'
import {ComponentWithPosition} from '@components/abstract/ComponentWithPosition'
import {CARTRIDGE_SIZE} from '@static/game'

export class ArrowCartridge extends ComponentWithPosition implements Cartridge {
  private readonly _cartridgeImage: HTMLImageElement

  private readonly _power = 10
  private readonly _speed = 4

  constructor(x: number, y: number) {
    super(x, y, CARTRIDGE_SIZE)

    this._cartridgeImage = new Image()
    this._cartridgeImage.src = arrowCartridge
  }

  move() {
    this._x += this._speed
  }

  draw() {
    this._gameConfigurator.context.drawImage(
      this._cartridgeImage,
      this._x,
      this._y - CARTRIDGE_SIZE / 2,
      32,
      10,
    )
  }

  get power() {
    return this._power
  }
}
