import type {Defender} from '../interfaces/Defender'
import wizardSprite from '../../../assets/images/wizard-attack.png'
import {CELL_GAP, CELL_SIZE} from '../../static/game'
import {HEALTH} from '../../static/defenders'
import {FONT_FAMILY, SIZES} from '../../static/styles'
import {createFontStyle} from '../../utils/createFontStyle'
import {Cartridge} from '../Cartridge'
import {ComponentWithPosition} from '../abstract/ComponentWithPosition'

export class WizardDefender extends ComponentWithPosition implements Defender {
  private _health: number
  private _defenderSprite: HTMLImageElement
  private _timer: number
  private _frameX: number
  private _frameY: number
  private _minFrame: number
  private _maxFrame: number

  constructor(x: number, y: number) {
    super(x, y, CELL_SIZE - CELL_GAP * 2)

    this._health = HEALTH
    this._timer = 0
    this._defenderSprite = new Image()
    this._defenderSprite.src = wizardSprite
    this._frameX = 0
    this._frameY = 0 // Sprite is horizontal, therefore y always is 0
    this._minFrame = 0
    this._maxFrame = 3 // Sprite consists of 4 pictures
  }

  draw() {
    const imageWidth = 32
    const imageHeight = 32

    this._gameConfigurator.context.fillStyle = 'gold'
    this._gameConfigurator.context.textAlign = 'start'
    this._gameConfigurator.context.textBaseline = 'middle'
    this._gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._gameConfigurator.context.fillText(Math.floor(this._health).toString(), this._x + CELL_SIZE / 2, this._y + CELL_SIZE / 2)
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
  }

  shoot(cartridges: Cartridge[]) {
    this._timer++;
    this._frameX += 0

    if (this._timer % 100 === 0) {
      cartridges.push(new Cartridge(this._x + CELL_SIZE, this._y + CELL_SIZE / 2));
    }

    // Slow down animation 25 times
    if (this._gameConfigurator.frame % 25 !== 0) return

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
