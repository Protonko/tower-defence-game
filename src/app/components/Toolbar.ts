import type {Component} from './interfaces/Component'
import type {ControlsBar} from '../interfaces/ControlsBar'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Toolbar implements Component {
  private gameConfigurator: GameConfiguratorSingleton
  private controlsBar: ControlsBar

  constructor() {
    this.gameConfigurator = GameConfiguratorSingleton.getInstance()
    this.controlsBar = this.gameConfigurator.controlsBar
  }

  // TODO: Observer?
  draw = () => {
    this.gameConfigurator.context.fillStyle = COLORS.backgroundColor
    this.gameConfigurator.context.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height)
    this.gameConfigurator.context.fillStyle = COLORS.textColor
    this.gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this.gameConfigurator.context.fillText(`Balance: ${this.gameConfigurator.balance}`, 20, 40)
  }
}
