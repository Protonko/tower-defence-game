import type {DefenderData} from '../interfaces/DefenderData'
import type {Component} from './interfaces/Component'
import type {ControlsBar} from '../interfaces/ControlsBar'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Toolbar implements Component {
  private _gameConfigurator: GameConfiguratorSingleton
  private _controlsBar: ControlsBar
  private _defendersData: DefenderData[]

  constructor(defendersData: DefenderData[]) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._controlsBar = this._gameConfigurator.controlsBar
    this._defendersData = defendersData
  }

  private drawDefendersSelector = (defenderData: DefenderData, index: number) => {
    const image = new Image()
    image.src = defenderData.imageSource

    const picSize = 32 // image size in sprite is 32px
    const defenderImageSize = 60
    const boxSize = 80
    const boxPadding = 10
    const boxMargin = 10
    const boxPosition = this._gameConfigurator.canvasWidth - (boxSize + boxMargin) * (index + 1)

    this._gameConfigurator.context.fillStyle = COLORS.defenderSelectorColor
    this._gameConfigurator.context.fillRect(
      boxPosition,
      boxPadding,
      boxSize,
      boxSize
    )

    this._gameConfigurator.context.fillStyle = COLORS.textColor
    this._gameConfigurator.context.font = createFontStyle(SIZES.costSize, FONT_FAMILY)
    this._gameConfigurator.context.textAlign = 'right'
    this._gameConfigurator.context.textBaseline = 'middle'
    this._gameConfigurator.context.fillText(defenderData.cost.toString(), boxPosition + boxSize - boxPadding, boxPadding * 2)

    this._gameConfigurator.context.drawImage(
      image,
      0,
      0,
      picSize,
      picSize,
      boxPosition,
      boxPadding * 2,
      defenderImageSize,
      defenderImageSize
    )
  }

  draw = () => {
    this._gameConfigurator.context.fillStyle = COLORS.toolbarColor
    this._gameConfigurator.context.fillRect(0, 0, this._controlsBar.width, this._controlsBar.height)
    this._gameConfigurator.context.fillStyle = COLORS.textColor
    this._gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._gameConfigurator.context.textAlign = 'left'
    this._gameConfigurator.context.textBaseline = 'top'
    this._gameConfigurator.context.fillText(`Balance: ${this._gameConfigurator.balance}`, 10, 10)
    this._defendersData.forEach(this.drawDefendersSelector)
  }
}
