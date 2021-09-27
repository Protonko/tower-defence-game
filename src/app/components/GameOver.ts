import {Component} from './interfaces/Component'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class GameOver implements Component {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D

  constructor() {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this._canvas = gameConfigurator.canvas
    this._context = gameConfigurator.context
  }

  draw() {
    this._context.fillStyle = COLORS.backgroundColor
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
    this._context.fillStyle = COLORS.textColor
    this._context.font = createFontStyle(SIZES.gameOverFontSize, FONT_FAMILY)
    this._context.textAlign = 'center';
    this._context.fillText('GAME OVER', this._canvas.width / 2, this._canvas.height / 2)
  }
}
