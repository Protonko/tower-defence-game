import type {Component} from '@models/Component'
import backgroundImage from '@assets/images/tower-background.png'
import {GameConfiguratorSingleton} from '@services/GameConfiguratorSingleton'
import {COLORS, FONT_FAMILY, SIZES} from '@static/styles'
import {createFontStyle} from '@utils/createFontStyle'

export class GameOver implements Component {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private readonly _backgroundImage: HTMLImageElement

  constructor() {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this._canvas = gameConfigurator.canvas
    this._context = gameConfigurator.context
    this._backgroundImage = new Image()
    this._backgroundImage.src = backgroundImage
  }

  draw() {
    this._context.drawImage(this._backgroundImage, 0, 0, 900, 600)
    this._context.fillStyle = COLORS.textColor
    this._context.font = createFontStyle(SIZES.gameOverFontSize, FONT_FAMILY)
    this._context.textAlign = 'center'
    this._context.fillText(
      'GAME OVER',
      this._canvas.width / 2,
      this._canvas.height / 2,
    )
    this._context.fillText(
      'Refresh page to try again',
      this._canvas.width / 2,
      this._canvas.height / 2 + 100,
    )
  }
}
