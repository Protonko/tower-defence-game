import type {ControlsBar} from '../interfaces/ControlsBar'
import {CanvasConfiguratorSingleton} from '../services/CanvasConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Toolbar {
  private canvasConfigurator: CanvasConfiguratorSingleton
  private controlsBar: ControlsBar

  constructor() {
    this.canvasConfigurator = CanvasConfiguratorSingleton.getInstance()
    this.controlsBar = this.canvasConfigurator.controlsBar
  }

  // TODO: Observer?
  draw = () => {
    this.canvasConfigurator.canvasContext.fillStyle = COLORS.backgroundColor
    this.canvasConfigurator.canvasContext.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height)
    this.canvasConfigurator.canvasContext.fillStyle = COLORS.textColor
    this.canvasConfigurator.canvasContext.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this.canvasConfigurator.canvasContext.fillText(`Balance: ${this.canvasConfigurator.balanceValue}`, 20, 40)
  }
}
