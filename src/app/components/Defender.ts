import {HEALTH} from '../static/defenders'
import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {CELL_SIZE} from '../static/game'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

// TODO: фабричный метод для защитников
export class Defender extends AbstractComponentWithPosition {
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
    this.gameConfigurator.context.fillStyle = COLORS.defenderColor
    this.gameConfigurator.context.fillRect(this.x, this.y, this.width, this.height)
    this.gameConfigurator.context.fillStyle = 'gold'
    this.gameConfigurator.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this.gameConfigurator.context.fillText(Math.floor(this.health).toString(), this.x, this.y + CELL_SIZE / 2)
  }
}
