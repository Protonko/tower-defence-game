import {Component} from './interfaces/Component'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class GameOver implements Component {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor() {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this.canvas = gameConfigurator.canvas
    this.context = gameConfigurator.context
  }

  draw() {
    this.context.fillStyle = COLORS.backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillStyle = COLORS.textColor
    this.context.font = createFontStyle(SIZES.gameOverFontSize, FONT_FAMILY)
    this.context.textAlign = 'center';
    this.context.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2)
  }
}
