import type {DefenderData, DEFENDER_TYPE} from '../interfaces/DefenderData'
import type {Mouse} from '../interfaces/Mouse'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'
import {collision} from '../utils/collision'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'

export class DefenderSelectBoxes {
  protected readonly _gameConfigurator: GameConfiguratorSingleton
  private _image: HTMLImageElement
  private _defendersData: DefenderData[]
  private _defendersSelectBoxMouses: Mouse[]
  private _picSize = 32 // image size in sprite is 32px
  private _defenderImageSize = 60
  private _boxSize = 80
  private _boxPadding = 10
  private _boxMargin = 10

  constructor(defendersData: DefenderData[]) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._image = new Image()
    this._defendersData = defendersData
    this._defendersSelectBoxMouses = []
  }

  draw(selectedDefenderType: DEFENDER_TYPE) {
    this._defendersData.forEach((defenderData, index) => this.drawDefendersSelectBox(defenderData, index, selectedDefenderType))
  }

  private drawDefendersSelectBox = (defenderData: DefenderData, index: number, selectedDefenderType: DEFENDER_TYPE) => {
    this._image.src = defenderData.imageSource

    const boxPosition = this._gameConfigurator.canvasWidth - (this._boxSize + this._boxMargin) * (index + 1)

    const mouse: Mouse = {
      x: boxPosition,
      y: this._boxPadding,
      width: this._boxSize,
      height: this._boxSize
    }

    if (this._defendersSelectBoxMouses.length < index + 1) {
      this._defendersSelectBoxMouses.push(mouse)
    }

    this._gameConfigurator.context.fillStyle = COLORS.defenderSelectorColor
    this._gameConfigurator.context.fillRect(
      boxPosition,
      this._boxPadding,
      this._boxSize,
      this._boxSize
    )

    this._gameConfigurator.context.fillStyle = COLORS.textColor
    this._gameConfigurator.context.font = createFontStyle(SIZES.costSize, FONT_FAMILY)
    this._gameConfigurator.context.textAlign = 'right'
    this._gameConfigurator.context.textBaseline = 'middle'
    this._gameConfigurator.context.fillText(defenderData.cost.toString(), boxPosition + this._boxSize - this._boxPadding, this._boxPadding * 2)

    this._gameConfigurator.context.drawImage(
      this._image,
      0,
      0,
      this._picSize,
      this._picSize,
      boxPosition,
      this._boxPadding * 2,
      this._defenderImageSize,
      this._defenderImageSize
    )

    if (
      (this._gameConfigurator.mouse.x && this._gameConfigurator.mouse.y && collision(mouse, this._gameConfigurator.mouse)) ||
      defenderData.type === selectedDefenderType
    ) {
      this._gameConfigurator.context.strokeStyle = COLORS.textColor
      this._gameConfigurator.context.lineWidth = 3
      this._gameConfigurator.context.strokeRect(
        boxPosition,
        this._boxPadding,
        this._boxSize,
        this._boxSize
      )
    }
  }

  get defendersSelectBoxMouses() {
    return this._defendersSelectBoxMouses
  }
}
