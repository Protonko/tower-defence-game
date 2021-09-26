import {HEALTH} from '../static/defenders'
import {AbstractComponent} from './AbstractComponent'
import {CELL_SIZE} from '../static/game'

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
    this.canvasConfigurator.canvasContext.fillStyle = 'blue'
    this.canvasConfigurator.canvasContext.fillRect(this.x, this.y, this.width, this.height)
    this.canvasConfigurator.canvasContext.fillStyle = 'gold'
    this.canvasConfigurator.canvasContext.font = '30px Roboto'
    this.canvasConfigurator.canvasContext.fillText(Math.floor(this.health).toString(), this.x, this.y + CELL_SIZE / 2)
  }
}
