import {CELL_SIZE} from '../static/game'
import {HEALTH} from '../static/defenders'
import {CanvasConfiguratorSingleton} from '../CanvasConfiguratorSingleton'

// TODO: наследование или интерфейс?
// TODO: фабричный метод для защитников
export class Defender {
  private x: number
  private y: number
  private shooting: boolean
  private health: number
  private readonly width: number
  private readonly height: number
  private timer: number
  private projectiles = []

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.shooting = false
    this.health = HEALTH
    this.width = CELL_SIZE
    this.height = CELL_SIZE
    this.timer = 0
    this.projectiles = []
  }

  draw() {
    const canvasContext = CanvasConfiguratorSingleton.getInstance().canvasContext

    canvasContext.fillStyle = 'blue'
    canvasContext.fillRect(this.x, this.y, this.width, this.height)
    canvasContext.fillStyle = 'gold'
    canvasContext.font = '20px'
    canvasContext.fillText(Math.floor(this.health).toString(), this.x, this.y)
  }
}
