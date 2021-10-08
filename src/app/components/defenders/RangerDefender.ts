import type {Defender} from '@models/Defender'
import type {Cartridge} from '@models/Cartridge'
import rangerSprite from '@assets/images/ranger-attack.png'
import {CARTRIDGE_TYPE} from '@models/CartridgeType'
import {CELL_GAP, CELL_SIZE} from '@static/game'
import {FONT_FAMILY, SIZES} from '@static/styles'
import {createFontStyle} from '@utils/createFontStyle'
import {ComponentWithPosition} from '@components/abstract/ComponentWithPosition'
import {CartridgeFactory} from '@components/cartridges/CartridgeFactory'

export class RangerDefender extends ComponentWithPosition implements Defender {
  private _health: number
  private readonly _defenderSprite: HTMLImageElement
  private _timer: number
  private _frameX: number
  private readonly _frameY: number
  private readonly _minFrame: number
  private readonly _maxFrame: number

  constructor(x: number, y: number) {
    super(x, y, CELL_SIZE - CELL_GAP * 2)

    this._health = 100
    this._timer = 0
    this._defenderSprite = new Image()
    this._defenderSprite.src = rangerSprite
    this._frameX = 0
    this._frameY = 0 // Sprite is horizontal, therefore y always is 0
    this._minFrame = 0
    this._maxFrame = 9 // Sprite consists of 10 pictures
  }

  draw() {
    const imageWidth = 32
    const imageHeight = 32

    this._gameConfigurator.context.drawImage(
      this._defenderSprite,
      this._frameX * imageWidth,
      this._frameY,
      imageWidth,
      imageHeight,
      this._x,
      this._y,
      this._width,
      this._height,
    )
    this._gameConfigurator.context.fillStyle = 'gold'
    this._gameConfigurator.context.textAlign = 'start'
    this._gameConfigurator.context.textBaseline = 'middle'
    this._gameConfigurator.context.font = createFontStyle(
      SIZES.characterHealthSize,
      FONT_FAMILY,
    )
    this._gameConfigurator.context.fillText(
      Math.floor(this._health).toString(),
      this._x + CELL_SIZE / 3,
      this.y - CELL_GAP,
    )
  }

  shoot(cartridges: Cartridge[]) {
    this._timer++
    this._frameX += 0

    if (this._timer % 100 === 0) {
      cartridges.push(
        CartridgeFactory.createCartridge(
          CARTRIDGE_TYPE.ARROW,
          this._x + CELL_SIZE,
          this._y + CELL_SIZE / 2,
        ),
      )
    }

    // Slow down animation 10 times
    if (this._gameConfigurator.frame % 10 !== 0) return

    if (this._frameX < this._maxFrame) {
      this._frameX++
    } else {
      this._frameX = 0
    }
  }

  get health() {
    return this._health
  }

  set health(health: number) {
    this._health = health
  }
}
