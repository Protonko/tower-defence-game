import {HEALTH} from '../static/defenders'
import {AbstractComponent} from './AbstractComponent'
import {CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

// TODO: фабричный метод для защитников
export class Defender extends AbstractComponent {
  private shooting: boolean
  private health: number
  private timer: number
  private projectiles = []

  constructor(x: number, y: number) {
    super(x, y)

    this.shooting = false
    this.health = HEALTH
    this.timer = 0
    this.projectiles = []
  }

  draw() {
    this.canvasConfigurator.canvasContext.fillStyle = COLORS.defenderColor
    this.canvasConfigurator.canvasContext.fillRect(this.x, this.y, this.width, this.height)
    this.canvasConfigurator.canvasContext.fillStyle = 'gold'
    this.canvasConfigurator.canvasContext.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this.canvasConfigurator.canvasContext.fillText(Math.floor(this.health).toString(), this.x, this.y + CELL_SIZE / 2)
  }
}
