import type {Component} from '@models/Component'
import type {ControlsBar} from '@models/ControlsBar'
import {GameConfiguratorSingleton} from '@services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '@static/styles'
import {createFontStyle} from '@utils/createFontStyle'

export class Toolbar implements Component {
  private _gameConfigurator: GameConfiguratorSingleton
  private _controlsBar: ControlsBar

  constructor() {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._controlsBar = this._gameConfigurator.controlsBar
  }

  draw = () => {
    this._gameConfigurator.context.fillStyle = COLORS.toolbarColor
    this._gameConfigurator.context.fillRect(
      0,
      0,
      this._controlsBar.width,
      this._controlsBar.height,
    )
    this._gameConfigurator.context.fillStyle = COLORS.textColor
    this._gameConfigurator.context.font = createFontStyle(
      SIZES.headerFontSize,
      FONT_FAMILY,
    )
    this._gameConfigurator.context.textAlign = 'left'
    this._gameConfigurator.context.textBaseline = 'top'
    this._gameConfigurator.context.fillText(
      `Balance: ${this._gameConfigurator.balance}`,
      10,
      10,
    )
  }
}
